<template>
    <div>
        user
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "user",
        mounted(){
          console.log("user - mounted")
        }
    }
</script>

<style scoped>

</style>
