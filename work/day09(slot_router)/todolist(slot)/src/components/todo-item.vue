<template>
  <li  :class="{highlight:highlight,line:item.checked}"
        @mouseenter="highlight=true"
        @mouseleave="highlight=false">
    <label>
      <!--
        <input type="checkbox" v-models="checked" />
        <span>item.text</span>
      -->
      <slot name="input" :index="index"></slot>
      <slot name="span" :text="item.text"></slot>
    </label>
    <button
      class="btn btn-danger"
      @click="delTodo"
      :style="{display:highlight?'block':'none'}">删除</button>
  </li>
</template>

<script>
    export default {
        name: "todo-item",
        props:{
          item:Object,
          index:Number
        },
        data(){
          return {
            //控制背景的高亮 删除按钮的显示
            highlight:false
          }
        },
        methods:{
          //点击删除按钮要触发的dom事件的回调
          delTodo(){
            //触发app.vue中修改数据的工具:delTodo
            this.$bus.$emit("delTodo",this.item.id)
          }
        }
    }
</script>

<style scoped>
  .line{
    position: relative;
  }
  .line:after{
    display: block;
    content: "";
    position: absolute;
    width: 90%;
    height: 1px;
    background: red;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .highlight{
    background: pink;
  }
  /*
    li:hover{
      background: pink !important;
    }
    li:hover button{
      display: block !important;
    }
  */

  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    display: none;
    float: right;
    margin-top: 3px;
    position: relative;
    z-index: 9;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
