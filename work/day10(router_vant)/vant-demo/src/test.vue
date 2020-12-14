<template>
  <div id="app">
    <van-popup v-model="show" position="top">
      <van-contact-card
        @click="handleC"
        type="add"
        name="damu"
        tel="15851802777"
        add-text=""></van-contact-card>
    </van-popup>

    <van-popup v-model="show" position="top">
      <van-contact-list
        :list="list"
        v-model="id"
        add-text=""
        default-tag-text="脖子以下都是脚"
        @add="addFn"
        @edit="editFn"
        @select="selectFn">
      </van-contact-list>
    </van-popup>

    <van-contact-edit
      set-default-label="设置为默认联系人"
      :show-set-default="true"
      :contact-info="contact"
      :is-edit="true"
      :is-saving="false"
      :is-deleting="false"
      :tel-validator="validator"
      @save="saveFn"
      @delete="deleteFn"></van-contact-edit>

  </div>
</template>

<script>
  import { ContactCard, ContactList, ContactEdit,Popup  } from 'vant';
  export default {
    name: 'App',
    data(){
      return {
        id:2,
        show:false,
        list:[
          {id:0,name:"damu",tel:"15851802777"},
          {id:1,name:"zdy",tel:"15851802888"},
          {id:2,name:"cc",tel:"1383838438",isDefault:true}
        ],
        contact:{
          id:3,name:"xiaole",tel:"15851802666",xxx:"000"
        }
      }
    },
    components:{
      [ContactCard.name]:ContactCard,
      [ContactList.name]:ContactList,
      [ContactEdit.name]:ContactEdit,
      [Popup.name]:Popup
    },
    methods:{
      handleC(){
        console.log("handleC")
      },
      addFn(){console.log("addFn")},
      editFn(item,index){console.log("editFn",item,index)},
      selectFn(item,index){console.log("selectFn",item,index)},
      validator(tel){
        return true
      },
      saveFn(content){
        console.log(content);
      },
      deleteFn(content){
        console.log(content);
      }
    }
  }
</script>

<style scoped>

</style>
