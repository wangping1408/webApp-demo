<template>
  <div id="app">
    <v-count></v-count>
  </div>
</template>

<script>
  import count from "./components/count"
  export default {
    name: 'App',
    components:{
      "v-count":count
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
