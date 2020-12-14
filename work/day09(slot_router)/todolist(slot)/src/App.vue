<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <todo-header @addTodo="addTodo"></todo-header>

        <todo-list :list="list">
          <template slot="input" slot-scope="{index}">
            <input type="checkbox"
                   style="width: 10px;height: 10px"
                    v-model="list[index].checked">
          </template>
          <template #span="{text}" >
            <span style="color: red">{{text}}</span>
          </template>
        </todo-list>
        <!--
            插槽的使用场景: 当一个组件在被复用时;需要动态化去定制一些标签
              1. 组件内部的html标签能不能正常显示?  不能
              2. 组件内部的html标签可以覆盖当前组件模板上的slot标签
         -->
        <todo-list :list="list">
          <template slot="input" slot-scope="{index}">
            <input type="checkbox"  v-model="list[index].checked">
          </template>
          <template #span="{text}" >
            <span style="color: green">{{text}}</span>
          </template>
        </todo-list>

        <todo-footer :list="list"
                     @checkedAll="checkedAll"
                     @clearComputed="clearComputed"></todo-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import todoHeader from "./components/todo-header";
  import todoList from "./components/todo-list";
  import todoFooter from "./components/todo-footer";
  import local from "./util/local"
  export default {
    name: 'App',
    data(){
      return {
        list:[]
      }
    },
    methods:{
      /*新增功能 是头部输入完成后新增todo的逻辑 是子向父进行数据传递 todo-header&app */
      addTodo(todo){
        this.list.unshift(todo)
      },
      /*删除功能 点击item组件中删除按钮 进行一次非父子的数据传递 todo-item&app */
      delTodo(id){
        this.list = this.list.filter((item)=>{
          return item.id !== id;
        })
      },
      /*全选 全不选 是子向父进行数据传递 todo-footer&app */
      checkedAll(flag){
        this.list.forEach((item)=>{
          item.checked = flag
        })
      },
      /*清除已完成任务*/
      clearComputed(){
        this.list = this.list.filter((item)=>{
            //返回false才代表要把当前这一项过滤掉
            return !item.checked
        })
      }
    },
    components:{
      "todo-header" : todoHeader,
      "todo-list" : todoList,
      "todo-footer" : todoFooter
    },
    mounted(){
      //当el被挂载时 我们从localstorage中读取todolidt的信息
      /*
      let todolistJson = localStorage.getItem("todolist");
      this.list = todolistJson ? JSON.parse(todolistJson) : [];
      */
      this.list = local.get("todolist",[])

      // 给总线绑定两个事件 deltoodo进行删除  checked进行选中的
      this.$bus.$on("delTodo",this.delTodo)
      this.$bus.$on("checked",this.checked)
    },
    watch:{
      list:{
        handler: function (val, oldVal) {
          //只要list中的数据产生改变;当前这个回调就会被调用
          // localStorage.setItem("todolist",JSON.stringify(val))
          local.set("todolist",val)
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
