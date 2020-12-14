### 下载koa
    npm i koa

### 引入(commonjs)
    const koa = require("koa");
        前端模块化的概念最早出至于node社区;
        后来浏览器端的开发者发现模块化对项目管理有着很大的优势;
        浏览器端的社区逐渐去引入了模块化的概念:
            require.js;seajs;es6


    require的第一个参数可以跟什么?
        内置包: fs http
        路径: "./index.js"
        第三方包: koa express
                node的包查找机制：
                    1. 先循环module.paths所对应的路径数组;找到对应的node_modules
                    2. 找到对应的node_modules后 在node_modules文件夹下找对应的包
                    3. 查阅该包的package.json文件 找package.json文件的main字段
                        如果该字段所对应的路径是真实有效的;则我们require的结果就是该
                                    路径对应的文件暴露出来的模块
                        如果不存在该字段;或者该字段所对应的路径是 无效;则找包目录下的
                                    index.js文件
                        如果上述两条规则都没有命中;则报错

### koa的基本使用
    const koa = require("koa");
    const app = new koa();
    app.use((ctx)=>{
            //ctx.body = "hello koa"
            //如果ctx.body的值是一个对象 当前这个对象会被转为json直接返回
            ctx.body = {
                data:123
            }
     });
    app.listen(3333,"127.0.0.1",()=>{
        console.log("server is runing")
    })


### koa2的中间件(洋葱模型)
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
    8. 一个中间件内部的next不能调用多次!

###  koa2路由
     一般根路径: http://127.0.0.1:8080 是访问首页的
     一般接后缀的url: http://127.0.0.1:8080/a.txt 是用来访问静态资源的
     一般不接后缀的url: http://127.0.0.1:8080/a 是用来访问后台接口的

     koa路由的基本使用
        安装koa-router插件
            npm i koa-router

        基础代码
            const Koa = require("koa");
            const Router = require("koa-router");
            const app = new Koa();
            const router = new Router();
            router.get("/a",(ctx)=>{ctx.body="a"})
            router.get("/b/:id",(ctx)=>{ctx.body="b"})
            app.use(router.routes())
            app.listen(8080)


     后台的路由需要提供什么样的能力?
        有能力处理URL  : 不同的URL可以对应不同的中间件
        有能力处理http方法 : 可以处理get post...
        有能力接受来自客户端的数据
            query  http://127.0.0.1:8080/user?name=damu&age=18
                ctx.query 接受来着url问号后的键值对
            params http://127.0.0.1:8080/user/1
                ctx.params 接受来着url中的params
            body   post的请求体
                ctx.request.body 接受来着请求体中的数据
                前提: 安装koa-bodyparser插件 npm i koa-bodyparser
                      在所有中间件的一开始要先注册 app.use(bodyParser());
            http协议的请求头也可以帮我们携带数据
                ctx.requeat.headers 接受来着请求头中的数据

        有能力返回响应
            状态码(ctx.status=412)
                200 : 代表请求成功
                404 : 代表请求找不到对应的路由
                500 : 服务器内部问题
                204 : 删除成功
                412 : 先决条件失败
                422 : 参数不合法
            数据(json ctx.body={})
                C(create 新增)  返回200状态码 并且将新增的那一条数据通过json格式返回出去
                R(read   查询)  返回200状态码 并且将查询出来的数据通过json格式返回出去
                U(update 修改)  返回200状态码 并且将修改完成的那一条数据通过json格式返回出去
                D(del    删除)  返回204状态码 不返回任何实际数据

        预请求
            加上app.use(router.allowedMethods())之后;我们可以发送options请求
            来查阅对应接口支持的http方法

        多中间件
            router.get("/c",(ctx,next)=>{
                ctx.body={c:"cccc"};
                next()
            },(ctx)=>{
                ctx.body.d = "dddd"
            })

        路由前缀
            var router = new Router({
              prefix: '/damu'
            });


### koa路由的批量注册
    1. 安装require-directory
        npm install require-directory
    2. 如何使用
        const requireDir = require("require-directory") ;
        requireDir(module,"./routers",{visit:(obj)=>{
            //obj:./routers目录中所有文件暴露的模块
            if(obj instanceof Router){
                app.use(obj.routes()).use(obj.allowedMethods())
            }
        }})


### koa错误处理
    1. 安装 koa-json-error
        npm install koa-json-error
    2. 如何使用
        window设置环境变量的方式
            set NODE_ENV=pro :处于生产环境
            set NODE_ENV=    :切回开发环境
        Linux环境变量的设置(结合npm脚本)
            "pro": "NODE_ENV=pro nodemon ./app/index.js"
        跨平台环境变量的设置(结合npm脚本)
            npm i cross-env -g
            cross-env:可以让结合npm脚本方式的环境变量设置在window和linux都起作用
            "pro": "cross-env NODE_ENV=pro nodemon ./app/index.js"

        const _ = require('lodash');
        const error = require('koa-json-error')
        let options = {
            postFormat: (e, obj) => process.env.NODE_ENV === 'pro' ? _.omit(obj, 'stack') : obj
        };
        app.use(error(options))


### koa参数检验
    1. 安装 koa-parameter
       npm install koa-parameter --save
    2. 如何使用
        const parameter = require('koa-parameter')
        parameter(app);

        //检验代码
        ctx.verifyParams({
            name:{type:"string",required:true},
            age:"number"
        })