<template>
  <div>
    <ul>
      <li v-show="message.id >=0 ">id:{{message.id}}</li>
      <li v-show="message.title">title:{{message.title}}</li>
      <li v-show="message.content">content:{{message.content}}</li>
    </ul>
  </div>
</template>

<script>
    //模拟一下数据库
    var messageList = [
      {id:0,title:"msg0",content:"msg0的内容"},
      {id:1,title:"msg1",content:"msg1的内容"},
      {id:2,title:"msg2",content:"msg2的内容"},
      {id:3,title:"msg3",content:"msg3的内容"},
      {id:4,title:"msg4",content:"msg4的内容"},
      {id:5,title:"msg5",content:"msg5的内容"}
    ]
    export default {
        name: "messageDetail",
        props:{
          id:String
        },
        data(){
          return {
            message:{}
          }
        },
        methods:{
          showDetail:function () {
            setTimeout(()=>{
              this.message = messageList.filter((item)=>{
                return item.id === (+this.id)
              })[0]
            },2000)
          }
        },
        mounted(){
            this.showDetail()
        },
        watch:{
          $route:{
            handler(){
              this.showDetail()
            },
            deep:true
          }
        }
    }
</script>

<style scoped>

</style>
