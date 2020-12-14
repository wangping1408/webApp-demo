### url
    协议://用户名:密码@域名:端口/params1/params2?query1&query2#hash
    query:key=val

### $route
    任意一个路由组件 都可以通过this.$route这个属性  来访问到当前路由对象(对url的抽象)
    动态路由组件是会复用的!
        user/1 --> user/2 对应的路由组件的生命周期函数是不会被调用的
        通过wacth $route来实现对动态路由组件切换的监听!

### props配置
    可是vue-router不建议在模板中直接使用 $route; 因为这样会让组件和vue-router
    产生深度耦合;一旦有了耦合;当前这个组件就没有离开vue-router;为了实现解耦;定义了
    props配置
        布尔值 : 将params作为props传递给对应的组件
        对象   : 将指定对象作为props传递给对应的组件
        函数   : 将函数的返回值作为props传递给对应的组件（函數的参数是路由对象）

### 路由配置
    path        : 决定路由组件对应的路径
    component   : 路由组件
    redirect    : 重定向(String path)
    children    : 子路由
    props       : 给对应的组件提供props数据的

### 路由器的配置
    routes   : 对应的路由数组
    mode     : 路由模式
        hash模式 : 兼容性比较强;但是在很多场景下有问题(比如支付)
        history模式 : 兼容性没那么强;但是几乎支持所有场景(支付 分享)
                        静态资源少用相对路径!
    linkActiveClass : 给对应的导航加class 模糊的匹配
    linkExactActiveClass: 给对应的导航加class 精确的匹配

### 编程式路由
    push
    replace
    go(-1)
    go(1)