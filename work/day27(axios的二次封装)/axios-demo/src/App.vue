<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    async mounted(){
      // await this.$http.user.getAllUser()
      // await this.$http.user.getAllUser()
      await this.$http.user.deleteUserById()
    }
  }
</script>

<style scoped>

</style>
