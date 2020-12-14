<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkedAll"/>
    </label>
    <span>
        <span>已完成<i style="color:green">{{checkedNum}}</i></span>
        <span>/全部<i style="color:red">{{list.length}}</i></span>
    </span>
    <button class="btn btn-danger" @click="clearComputed">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'todo-footer',
    props:{
      list:Array
    },
    computed:{
      //代表已完成任务的数量
      checkedNum(){
        return this.list.reduce((adder,item)=>{
            return adder + (item.checked ? 1 : 0)
        },0)
      },
      //代表footer中的复选框 要不要选中
      //checkedAll什么时候返回true? 已完成的数量要等于总数量并且他们都不等于0
      checkedAll:{
        get(){
          var flag =  (this.checkedNum===0 && this.list.length===0)
          return (this.checkedNum === this.list.length) && !flag
        },
        set(val){
          /*点击全选按钮 会导致当前的set方法被调用 val就是全选按钮现在的状态
            true 代表全选按钮被选中了 那么list中所有任务都有被选中
            false 代表全选按钮被勾除了 那么list中所有任务都有被勾除*/
          this.$emit("checkedAll",val)
        }
      }
    },
    methods:{
      //清除已完成任务
      clearComputed(){
        this.$emit("clearComputed")
      }
    }
  }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
