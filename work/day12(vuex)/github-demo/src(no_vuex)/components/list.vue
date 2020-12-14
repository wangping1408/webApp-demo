<template>
  <div>
    <div v-if="showMsg">请输入查询用户</div>
    <div v-else-if="showLoing">loading....</div>
    <div v-else-if="showNoBody">查无此人</div>
    <div v-else class="row">
      <div class="card" v-for="card in cards" :key="card.id">
        <a :href="card.page" target="_blank">
          <img :src="card.avatar" style='width: 100px' alt="...."/>
        </a>
        <p class="card-text">{{card.userName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "list",
        data(){
          return {
            showMsg:true,
            showLoing:true,
            showNoBody:true,
            cards:[]
          }
        },
        mounted(){
          PubSub.subscribe('search', (name,searchName)=>{
               //状态的重置
               this.showMsg = true;
               this.showLoing = true;
               this.showNoBody = true;

               (async () => {
                 console.log(this)
                 //置为loding状态
                 this.showMsg = false ;
                 const {items} = await this.$axios.get("https://api.github.com/search/users",{
                   params:{
                     q:searchName
                   }
                 })
                 this.cards = items.map((item)=>{
                   return {
                     page:item.html_url,
                     avatar:item.avatar_url,
                     userName:item.login
                   }
                 })
                 //成功请求到数据
                 this.showLoing = false;
                 this.showNoBody = false;
               })().catch(()=>{
                 this.showLoing = false;
                 this.showNoBody = true;
               })
          })
        }
    }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }

</style>
