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
    import {mapState} from "vuex";
    export default {
        name: "list",
        computed:{
          ...mapState(["cards","showMsg","showLoing","showNoBody"])
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
