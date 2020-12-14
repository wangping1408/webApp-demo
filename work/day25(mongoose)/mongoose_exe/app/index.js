const Koa = require("koa");
const Router = require("koa-router");
const bodyparser = require("koa-bodyparser")
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
app.use(bodyparser())
//路由批量注册
requireDirectory(module, "./routers", {visit: (obj)=>{
    if(obj instanceof Router){
        //説明obj是一个koa路由
        app.use(obj.routes()).use(obj.allowedMethods())
    }
}})
app.listen(8000,"127.0.0.1",()=>{
    console.log("server is runing on http://127.0.0.1:8000")
})