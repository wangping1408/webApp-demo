Vue.component("v-todolist",{
    template:`<div>
                        <input type="text" placeholder="今天要干嘛"
                            v-model="task" @change="fn">
                        <ul>
                            <li v-for="item in listTask">
                                {{item}}
                            </li>
                        </ul>
                   </div>`,
    data(){
        return {
            task:"",
            listTask:["吃饭","睡觉","跳伞","玩李强"]
        }
    },
    methods:{
        fn(){
            this.listTask.push(this.task);
            this.task = "";
        }
    }
})