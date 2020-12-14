### 安装
    npm i vuex

### 如何初始化vuex的环境
    1. 将vuex注册为的vue插件
        import Vuex from "vuex"
        import Vue from "vue"
        Vue.use(Vuex)
    2. 创建并暴露一个仓库
        export default new Vuex.Store({
             state:{}, //存数据
             mutations:{fn(state){}}, //同步的修改数据的
             actions:{fn(store){}}, //异步的提交mutation的
        })
    3. 将仓库交给vue来管理
        import store from "./store"
        new Vue({
            store
        })

### 注意点
    1.state 会 转绑给当前的仓库对象
    2.我们在组件上都可以通过$store属性来访问到仓库对象

### 如何优雅的读取数据
    在组件上都应该有个计算属性与仓库中的数据一一对应

### 如何优雅的修改数据
    不管是同步的修改还是异步的修改
        在组件上都通过转发一个action来触发一个mutation的执行(有可能是同步的有可能是一步的);
        而不是直接修改数据