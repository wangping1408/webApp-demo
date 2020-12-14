<template>
  <div id="app">
      app <br>
      <router-view></router-view>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'App',
    async mounted(){
        const body = await axios({
            url:"/8000/user/getAll",
            method:"get"
        })
        const body2 = await axios({
            url:"/8001/user/test",
            method:"get"
        })
        console.log(body,body2);
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
