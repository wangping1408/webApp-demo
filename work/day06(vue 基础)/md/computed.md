### 语法
    <span>{{key}}</span>
    computed:{
        key:{
            //get方法的返回值 会作为模板上显示的值
            //当界面初始化的时候 get会被调用一次
            //当key所依赖的属性产生变化的时候 get方法也会被调用
            get(){},
             //val 代表计算属性(key)被修改后 最新的那个值
             //当key的值被修改时 对应的set方法会被调用
            set(val){

            }
        }
    }

### 语法糖
    可以省略set方法
    computed:{
        //当前这个方法是key所对应的get方法
        key(){

        }
    }