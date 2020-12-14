const path = require("path")
const fs = require("fs")
const Koa = require("koa");
const Router = require("koa-router");
// const bodyparser = require("koa-bodyparser")
const koaBody = require('koa-body');
const requireDirectory = require('require-directory')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const _ = require('lodash');
const cors = require('koa-cors');
const serve = require('koa-static');
const app = new Koa();


//引入数据库服务(连接数据库)
require("./db/db.js");
//使用cors来解决跨域问题
// app.use(cors())
//将public目录变为一个静态资源目录
app.use(serve(__dirname + '/public'));


//处理异常
let options = {
    //obj 就是koa-json-error这个库返回出来的错误信息(json)
    postFormat: (e, obj) => process.env.NODE_ENV === 'pro' ? _.omit(obj, 'stack') : obj
};
app.use(error(options))
//参数检验  ctx上会多一个verifyParams(key:rule)
parameter(app);
//解析body
// app.use(bodyparser())
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname,"/public/img"),
        keepExtensions:true
    }
}));
//路由批量注册
requireDirectory(module, "./routers", {visit: (obj)=>{
    if(obj instanceof Router){
        //説明obj是一个koa路由
        app.use(obj.routes()).use(obj.allowedMethods())
    }
}})
//处理所有的404请求
app.use(async (ctx)=>{
    if(ctx.status === 404){
        //说明当前浏览器地址栏中的url没有命中任何后台路由
        //很有可能当前这个url代表的是一个前端路由
        const indexUrl = path.join(__dirname,"/public/index.html");
        ctx.set("Content-Type","text/html")
        ctx.body = fs.createReadStream(indexUrl)
    }
})
app.listen(8001,"127.0.0.1",()=>{
    console.log("server is runing on http://127.0.0.1:8001")
})