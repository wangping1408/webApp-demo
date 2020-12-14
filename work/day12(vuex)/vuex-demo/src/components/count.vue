<template>
  <div>
      <span style="color: green;font-size: 40px">{{count}}</span>
      <br/>
      <button @click="inc({step:2})">+</button>
      <button @click="desc({step:2})">-</button>
      <br>
      <button @click="asyncinc({step:3})">asyncinc</button>
  </div>
</template>

<script>

    /*仓库中的数据 在组件上使用时;最好拿一个计算属性与之对应!!!
      这样可以避免脏数据的问题;而且数据的响应式依旧存在!*/
    import {mapState,mapActions,mapMutations,mapGetters} from "vuex";
    export default {
        name: "count",
        computed:{
          ...mapState(["count"]), // ...{count(){return this.$store.state.count}}
        },
        methods:{
          ...mapActions(["inc","desc","asyncinc"])
        },
        mounted(){
          console.log(mapState(["count"]).count.call(this))
        }
    }
</script>

<style scoped>

</style>
