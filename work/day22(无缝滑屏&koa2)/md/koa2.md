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
    app.use((ctx)=>{ctx.body = "hello koa"});
    app.listen(3333,"127.0.0.1",()=>{
        console.log("server is runing")
    })


