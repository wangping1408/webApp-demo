<template>
  <div class="todo-header">
    <input type="text"
           placeholder="请输入你的任务名称，按回车键确认"
            v-model="text" @keydown.13="addTodo"/>
  </div>
</template>

<script>
    import local from "../util/local"
    export default {
        name: "todo-header",
        data(){
          return {
            text:""
          }
        },
        methods:{
          addTodo(){
              //拿到一个id
              let id = local.get("todoID",0)
              //新增的待办任务
              let todo = {
                  id,
                  text:this.text,
                  checked:false
              }
              this.$emit("addTodo",todo)
              this.text = "";
              local.set("todoID",id+1)
          }
        }
    }
</script>

<style scoped>
  /*header*/
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>
