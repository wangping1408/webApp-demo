<template>
  <div id="app">
    <input type="text" v-model="msg">
    <br>
    <button @click="clickFn">注册</button>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'App',
    data(){
        return {
            msg:""
        }
    },
    methods:{
        clickFn(){
            axios.post("http://127.0.0.1:8000/user/add",{
                name:this.msg
            })
        }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
