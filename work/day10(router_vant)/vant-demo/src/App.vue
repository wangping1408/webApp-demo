<template>
  <div id="app">
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
  import Vue from 'vue';
  import { ContactCard, ContactList, ContactEdit ,Popup } from 'vant';
  Vue.use(ContactCard);
  Vue.use(ContactList);
  Vue.use(ContactEdit);
  Vue.use(Popup);

  export default {
    data() {
      return {
        chosenContactId: null, //当前选中的联系人的id
        editingContact: {}, //填充编辑页的表单的
        showList: false, // 控制列表界面的显示与隐藏
        showEdit: false, // 控制编辑界面的显示与隐藏
        isEdit: false, //决定了删除按钮是否要显示 true:显示
        //代表初始时联系人的数据源
        list: [
          {
            name: '张三',
            tel: '13000000000',
            id: 0,
          },
        ],
      };
    },

    computed: {
      //决定了联系人卡片组件的渲染类型
      cardType() {
        return this.chosenContactId !== null ? 'edit' : 'add';
      },
      //决定了当前要展示的联系人
      currentContact() {
        const id = this.chosenContactId;
        return id !== null ? this.list.filter((item) => item.id === id)[0] : {};
      },
    },

    methods: {
      // 添加联系人
      onAdd() {
        //点击新增按钮时 将id填充到编辑页的表单内(当前存id的表单是隐藏的)
        this.editingContact = { id: this.list.length };
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
      onSave(info) {
        this.showEdit = false; //将编辑页隐藏起来
        this.showList = false; //将列表页隐藏起来

        if (this.isEdit) {
          //修改联系人的逻辑
          this.list = this.list.map((item) =>
            item.id === info.id ? info : item
          );
        } else {
          //新增联系人的逻辑
          this.list.push(info); // 将表单内容组成的联系人对象放到list中
        }

        this.chosenContactId = info.id; //将选中的id变为新增数据的id
      },

      // 删除联系人
      onDelete(info) {
        this.showEdit = false; //隐藏编辑页
        this.list = this.list.filter((item) => item.id !== info.id);
        //如果删除的是选中的那一条  那么选中id要置为nulll
        if (this.chosenContactId === info.id) {
          this.chosenContactId = null;
        }
      },

      // 选中联系人
      onSelect() {
        this.showList = false; //把列表页面隐藏
      },
    },
  };
</script>

<style scoped>

</style>
