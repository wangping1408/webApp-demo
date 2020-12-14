<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" v-model.lazy="searchName"
             placeholder="enter the name you search"/>
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script>
    import {mapActions} from "vuex"
    import {UPDATESEARCHNAME,SEARCH} from "../store/mutation_types"
    export default {
        name: "search",
        computed:{
          searchName:{
            get(){return this.$store.state.searchName},
            set(val){
              this.updateSearchName(val)
            }
          }
        },
        methods:{
           ...mapActions([SEARCH]),
           updateSearchName(searchName){
             //转发action --> 提交mutation --> 同步的修改数据
             this.$store.dispatch(UPDATESEARCHNAME,searchName)
           }
        }
    }
</script>

<style scoped>

</style>
