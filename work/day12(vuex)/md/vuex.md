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
        在组件上都通过转发一个action来触发一个mutation的执行(有可能是同步的有可能是异步的);
        而不是直接修改数据

### 仓库内部的计算属性
    getters 可以将state中的数据拿出来进行二次加工(针对所有组件)!

### 组件写法层面的优化
    vuex提供了诸如 mapState mapGetters mapMutations mapActions
    import {mapState, mapGetters ,mapMutations ,mapActions} from "vuex"
        mapState(["a"]) 返回: {a(){return this.$store.state.a}}
        mapGetters(["a"]) 返回: {a(){return this.$store.getters.a}}
        mapMutations(["a"]) 返回: {a(){this.$store.commit("a")}}
        mapActions(["a"]) 返回: {a(){this.$store.dispatch("a")}}
        对象的写法尽量少用
            mapState({myA:"a"}) 返回: {myA(){return this.$store.state.a}}
    
    mapState(["a"]); mapGetters(["a"]) 都应该有个计算属性与之对应
        computed:mapState(["a"])  ; computed:mapGetters(["a"])
        computed:{
            ...mapState(["a"])
        }

### 仓库写法层面的优化
    分模块去设计仓库(暂时还没涉及)