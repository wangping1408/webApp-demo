<template>
  <div id="contact">
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showList = true"
    />

    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-contact-list
        v-model="chosenContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>

  </div>
</template>

<script>
  import { ContactCard, ContactList, ContactEdit ,Popup } from 'vant';

  const OK = 200;
  export default {
    data() {
      return {
        chosenContactId: null, //当前选中的联系人的id
        editingContact: {}, //填充编辑页的表单的
        showList: false, // 控制列表界面的显示与隐藏
        showEdit: false, // 控制编辑界面的显示与隐藏
        isEdit: false, //决定了删除按钮是否要显示 true:显示
        //代表初始时联系人的数据源
        list: []
      };
    },

    computed: {
      //决定了联系人卡片组件的渲染类型
      cardType() {
        return this.chosenContactId !== null ? 'edit' : 'add';
      },
      //决定了当前要展示的联系人
      currentContact() {
       /* 新增一个联系人 必须是先更新list 再更新id
        删除一个联系人 必须先更新id 再更新list*/
        const id = this.chosenContactId;
        return id !== null ? this.list.filter((item) => item.id === id)[0] : {};
      },
    },

    methods: {
      // 添加联系人
      onAdd() {
        //点击新增按钮时 将id填充到编辑页的表单内(当前存id的表单是隐藏的)
        //如果换成真正接口 此处的id是不需要提前设置的
        this.editingContact = {};
        //隐藏删除按钮
        this.isEdit = false;
        //将编辑页显示出来
        this.showEdit = true;
      },

      // 编辑联系人
      onEdit(item) {
        this.isEdit = true; //显示删除按钮
        this.showEdit = true; //显示编辑页
        this.editingContact = item;//将要编辑的联系人信息回显整个编辑页中
      },

      // 保存联系人 info:表单内容
      async onSave({name,tel,id}) {
        this.showEdit = false; //将编辑页隐藏起来
        this.showList = false; //将列表页隐藏起来

        //请求回来的数据
        let body ="";
        if (this.isEdit) {
          //修改联系人的逻辑
          body = await this.$http.contact.editContact({name,tel,id})
          await this.updateList(false)

        } else {
          body = await this.$http.contact.addContactByForm({name,tel,id,a:"a"})
          // await this.$http.contact.addContactByJson({name,tel,id})
          await this.updateList(false)
        }

        //body.data.id : 如果是新增操作 此处的id才是真正新被添加联系人的id
        this.chosenContactId = body.data.id; //将选中的id变为新增数据的id
      },

      // 删除联系人
      async onDelete(info) {
        this.showEdit = false; //隐藏编辑页

        //发请求
        await this.$http.contact.deleteContact({id:info.id})

        //如果删除的是选中的那一条  那么选中id要置为nulll
        if (this.chosenContactId === info.id) {
          this.chosenContactId = null;
        }
        await this.updateList(false)
      },

      // 选中联系人
      onSelect() {
        this.showList = false; //把列表页面隐藏
      },

      //更新联系人列表
      async updateList(toast){
        const {data,code} = await this.$http.contact.getContactList({},{toast})
        if(code === OK)
          this.list = data
      }
    },

    components:{
      [ContactCard.name]:ContactCard,
      [ContactList.name]:ContactList,
      [ContactEdit.name]:ContactEdit,
      [Popup.name]:Popup
    },

    async mounted(){
      await this.updateList()
    }
  };
</script>

<style scoped>

</style>
