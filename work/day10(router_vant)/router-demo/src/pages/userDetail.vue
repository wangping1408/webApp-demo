<template>
    <div>
      userDetail: 当前访问的用户是:
      <i style="color: green">{{id}}</i>
      号用户;当前用户的用户名是:
      <i style="color: green">{{name}}</i>
    </div>
</template>

<script>
    export default {
        name: "userDetail",
        props:{
          id:String,
          name:String
        },
        mounted(){
          console.log("userDetail - mounted")
        },
        watch:{
          $route:{
            handler(){
              console.log("watch handler")
            },
            deep:true
          }
        }
    }
</script>

<style scoped>

</style>
