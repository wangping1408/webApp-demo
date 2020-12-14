<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" v-model="searchName"
             placeholder="enter the name you search"/>
      <button @click="handleC">Search</button>
    </div>
  </section>
</template>

<script>
    import PubSub from 'pubsub-js'
    export default {
        name: "search",
        data(){
          return {
            searchName:""
          }
        },
        methods:{
          handleC(){
              PubSub.publish('search', this.searchName);
              this.searchName = ""
          }
        }
    }
</script>

<style scoped>

</style>
