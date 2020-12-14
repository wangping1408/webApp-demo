<template>
    <div>
      <ul>
        <li class="item" v-for="(item,index) in messageList" :key="index">
          <router-link :to="`/home/message/${item.id}`">{{item.title}}</router-link>
          <button @click="pushFn(item.id)">push</button>
          <button @click="replaceFn(item.id)">replace</button>
        </li>
      </ul>
      <button @click="backFn">back</button>
      <router-view></router-view>
    </div>
</template>

<script>
    //模拟一下数据库
    var messageList = [
      {id:0,title:"msg0"},
      {id:1,title:"msg1"},
      {id:2,title:"msg2"},
      {id:3,title:"msg3"},
      {id:4,title:"msg4"},
      {id:5,title:"msg5"}
    ]
    export default {
        name: "message",
        data(){
          return {
            messageList:[]
          }
        },
        methods:{
          pushFn(id){this.$router.push(`/home/message/${id}`)},
          replaceFn(id){this.$router.replace(`/home/message/${id}`)},
          backFn(){this.$router.back()}
        },
        mounted(){
          //模拟一下ajax请求
          setTimeout(()=>{
            this.messageList = messageList
          },2000)
        }
    }
</script>

<style scoped>
  .item{
    width: 200px;
    display: flex;
    justify-content: space-between;
  }

</style>
