import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)


//1. 怎么优雅的读取仓库中的数据
//2. 怎么优雅的修改仓库中的数据
export default new Vuex.Store({
  strict: true,
  state:{
    count:0
  },
  mutations:{
    inc(state,{step}){
      state.count+=step
    },
    desc(state,{step}){
      state.count-=step
    },
    asyncinc(state,{step}){
      state.count+=step
    }
  },
  actions:{
    inc({commit},{step}){
      commit("inc",{step})
    },
    desc({commit},{step}){
      commit("desc",{step})
    },
    asyncinc(store,{step}){ //解构赋值
      setTimeout(()=>{
        store.commit("asyncinc",{step}) //es6对象的简写形式
      },2000)
    }
  }
})
