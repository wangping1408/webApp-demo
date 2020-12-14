/*
    1. 引入koa
    2. 创建koa实例
    3. 通过use方法给对应的koa实例注册中间件
    4. 调用koa实例的监听方法 监听一个端口
    5. 默认第一个中间件在请求过来时 自动调用
    6. 中间件函数的参数有两个
        第一个是koa上下文 ctx
        第二个参数是下一个中间件的包裹函数(返回的是一个promise)
*/


const koa = require("koa");
const app = new koa();
app.use((ctx,next)=>{
    console.log(1)
    next()
})
app.use((ctx,next)=>{
    console.log(2)
    next()
})
app.use(()=>{
    console.log(3)
})
app.listen(3000)