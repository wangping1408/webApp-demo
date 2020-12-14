<template>
  <ul class="todo-main">
    <todo-item v-for="(item,index) in list" :index="index" :item="item" :key="item.id">
      <template slot="input" slot-scope="{index}">
        <slot name="input" :index="index"></slot>
      </template>
      <template slot="span" slot-scope="{text}">
        <slot name="span" :text="text"></slot>
      </template>
    </todo-item>
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
