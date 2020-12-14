/*
    1. 引入koa
    2. 创建koa实例
    3. 通过use方法给对应的koa实例注册中间件
    4. 调用koa实例的监听方法 监听一个端口
    5. 默认第一个中间件在请求过来时 自动调用
    6. 中间件函数的参数有两个
        第一个是koa上下文 ctx
        第二个参数是下一个中间件的包裹函数(返回的是一个promise)
        如果想让下一个中间件执行 必须显示调用这个包裹函数(一般命名叫next)
    7. 保证中间件的执行符合洋葱模型的规范
        所有的中间件一定要定义成async函数
        所有的next 都要被await
        所有的异步操作都要promise 并且要被await
*/
const koa = require("koa");
const app = new koa();
app.use(async (ctx,next)=>{
    console.log(1)
    await next()
    console.log(5)
})
app.use(async (ctx,next)=>{
    console.log(2)
    await next()
    console.log(4)
})
app.use(async (ctx,next)=>{
    await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(3);
            resolve()
        },2000)
    })
    next()
})
app.listen(3000)


//1 2 (等2秒) 3 4 5