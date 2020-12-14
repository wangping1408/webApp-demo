<template>
  <div>
      <span style="color: green;font-size: 40px">{{count}}</span>
      <br/>
      <button @click="inc">+</button>
      <button @click="desc">-</button>
      <br>
      <button @click="asyncinc">asyncinc</button>
  </div>
</template>

<script>

    /*仓库中的数据 在组件上使用时;最好拿一个计算属性与之对应!!!
      这样可以避免脏数据的问题;而且数据的响应式依旧存在!*/

    export default {
        name: "count",
        computed:{
          count(){
            return this.$store.state.count
          }
        },
        methods:{
          inc(){this.$store.dispatch("inc",{step:2})},
          desc(){this.$store.dispatch("desc",{step:2})},
          asyncinc(){this.$store.dispatch("asyncinc",{step:3})}
        }
    }
</script>

<style scoped>

</style>
