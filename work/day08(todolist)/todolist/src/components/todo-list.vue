<template>
  <ul class="todo-main">
    <todo-item v-for="(item,index) in list" :item="item" :key="item.id"></todo-item>
  </ul>
</template>

<script>
  import todoItem from "./todo-item"
  export default {
    name: 'todo-list',
    props:{
      list:Array
    },
    components:{
      "todo-item":todoItem
    }
  }
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
