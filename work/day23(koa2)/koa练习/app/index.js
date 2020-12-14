const Koa = require("koa");
const bodyparser = require("koa-bodyparser")
const routersFn = require("./routers")
const app = new Koa();

//解析body
app.use(bodyparser())
//路由批量注册
routersFn(app)
app.listen(8888,"127.0.0.1",()=>{
    console.log("server is runing on http://127.0.0.1:8888")
})