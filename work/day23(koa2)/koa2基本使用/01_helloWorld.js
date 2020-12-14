/*
    1. 引入koa
    2. 创建koa实例
    3. 通过use方法给对应的koa实例注册中间件
    4. 调用koa实例的监听方法 监听一个端口
*/


const koa = require("koa");
const app = new koa();
app.use((ctx)=>{
    ctx.body={
        data:123
    }
})
app.listen(3333,"localhost",()=>{
    console.log(`服务器运行在 http://localhost:3333/`)
})