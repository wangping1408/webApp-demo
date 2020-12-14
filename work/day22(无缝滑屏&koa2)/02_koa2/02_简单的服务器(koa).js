/*
    1. 引入koa
    2. 创建koa实例
    3. 通过use方法给对应的koa实例注册中间件
    4. 调用koa实例的监听方法 监听一个端口
*/


//koa 在源码内部就是一个Application class
const koa = require("koa");
//app 就是 Application的实例
const app = new koa();
//use的第一个参数为什么叫中间件
//因为这个函数最终被塞到了一个叫middleware的数组中
app.use((ctx)=>{
    //ctx : koa的上下文
    ctx.body="hello koa ....."
})
app.listen(3333,"localhost",()=>{
    console.log(`服务器运行在 http://localhost:3333/`)
})