### vue helloworld
    1. 引入vue.js文件
    2. 创建模板 <div id="app">{{msg
    }}</div>
    3. 创建vue实例对象
        var vm = new Vue({
            el:"#app",
            data:{
                msg:"hello vue"
            }
        })