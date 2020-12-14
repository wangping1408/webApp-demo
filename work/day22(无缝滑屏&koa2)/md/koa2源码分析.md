### koa helloworld
    const koa = require("koa");
    const app = new koa();
    app.use((ctx)=>{ctx.body = "hello koa"});
    app.listen(3333,"127.0.0.1",()=>{
        console.log("server is runing")
    })

### 服务是如何启动的
    //当前这个koa是一个Application
    const koa = require("koa");
    //当前这个app是一个Application实例
    const app = new koa();
    //use第一个参数(函数);这个函数会被塞到一个叫middleware的数组中
    //我们称当前这个函数是中间件函数
    app.use((ctx)=>{ctx.body = "hello koa"});
    //listen方法中包含了node原生服务的两个重要步骤: createServer ; listen
    app.listen(port);

### 什么是koa上下文
    const app = new koa() : ctx关系图的右边部分已经构建成功!
    app.listen(port) :
        在app.listen时; 我们调用了原生node的createServer和listen方法
        createServer是需要一个回调函数的;这个回调函数会在服务每一次被访问时;
        自动塞入队列;最终被执行. 当前这个回调koa是通过一个叫callback的方法来提供的!
        提供出来的就是handleRequest方法!


    重点讨论了callback方法:
        callback() {
                const fn = compose(this.middleware);
                const handleRequest = (req, res) => {
                    const ctx = this.createContext(req, res);
                    return this.handleRequest(ctx, fn);
                };
                return handleRequest;
        }



    compose方法在callback被调用时一同执行
        //当前这个fn是中间件函数的包裹函数
        const fn = compose(this.middleware);

    handleRequest方法是每一次请求来之后都要执行的方法!
        const handleRequest = (req, res) => {
            //ctx关系图的左边部分被构建成功
            const ctx = this.createContext(req, res);
            //将ctx关系图左上角的那个对象 暴露给中间件函数的第一个参数
            return this.handleRequest(ctx, fn);
        };