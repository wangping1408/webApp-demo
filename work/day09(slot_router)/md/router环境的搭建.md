###设计目录
    pages : 存放路由组件
        存放一个个.vue文件
    router: 存放路由器
        index.js;暴露一个路由器对象
    routes: 存放路由
        index.js;暴露一个路由数组


### 路由环境搭建步骤
    1.将vue-router集成为vue的插件(做一次)
    2.定义路由组件(可能要做很多次)
    3.定义路由数组(可能要做很多次)
    4.将路由交给路由器管理(做一次)
    5.将路由器注册到vue的配置中(做一次)

### 路由环境搭建步骤具体代码
    1&4.在router/ index.js
        import Vue from "vue";
        improt VueRouter from "vue-router";
        import routes from "./routes"
        Vue.use(VueRouter)
        export default new VueRouter({
            routes
        })

    2. pages文件夹下新建N个vue文件
        a.vue

    3. 在routes/index.js
        import a from "../pages/a"
        export default [
            {path:"/a",component:a}
        ]

    5. 在main.js中
        import router from "./router"
        new Vue({
            router
        })

### 路由组件显示得通过<router-view></router-view>
    一级路由 在app.vue中的<router-view></router-view>上显示
    二级路由 在其父路由中的<router-view></router-view>上显示
    .....

### 路由跳转得通过<router-link to="path"></router-view>

### 嵌套路由
        在routes/index.js
        import a from "../pages/a"
        import b from "../pages/b"
        export default [
            {
                path:"/a",
                component:a,
                children:[
                    {path:"b",component:b}
                ]
            }
        ]

        如何访问b组件:
            <router-link to="/a/b"></router-view>
            b组件会在a组件的<router-view></router-view>上显示

### 动态路由
    多个path指向同一个组件;
    在routes/index.js
        import user from "../pages/user"
        export default [
            {path:"/user/:id",component:user}
        ]