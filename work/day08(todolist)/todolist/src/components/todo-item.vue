<template>
  <li :class="{highlight:highlight,line:checked}"
      @mouseenter="highlight=true"
      @mouseleave="highlight=false">
    <label>
      <!--
        v-models 脏数据问题;如果v-model指定的数据来至于其他组件
        因为v-model实现了数据的双向绑定 一定输入框中输入内容 会自动修改
        对应的数据 导致子组件有可能自动的修改了父组件的数据 违背vue开发规范:
        子组件不能直接修改父组件的数据!!!

        解决方案:
          将v-model对应的数据改成计算属性;通过计算属性的get方法来获取值
          通过set去触发一个vue的自定义事件 通过这个自定义事件来调用app中
          修改list数据的工具:checked
      -->
      <input type="checkbox"
             v-model="checked" />
      <span>{{item.text}}</span>
    </label>
    <button class="btn btn-danger"
            @click="delTodo"
            :style="{display:highlight?'block':'none'}">删除</button>
  </li>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    item: Object
  },
  data () {
    return {
      //控制背景的高亮 删除按钮的显示
      highlight: false
    }
  },
  computed: {
    //解决脏数据需要的计算属性
    checked: {
      get () {
        return this.item.checked
      },
      set (val) {
        this.$bus.$emit("checked", this.item.id, val)
      }
    }
  },
  methods: {
    //点击删除按钮要触发的dom事件的回调
    delTodo () {
      //触发app.vue中修改数据的工具:delTodo
      this.$bus.$emit("delTodo", this.item.id)
    }
  }
}
</script>

<style scoped>
.line {
  position: relative;
}
.line:after {
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
.highlight {
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
