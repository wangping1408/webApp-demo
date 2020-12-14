### 组件化的意义
    复用大段的Html代码;如果能实现html css js代码的一同复用;那就是真正的组件化!

### 组件是什么
    一个组件本质上就是一个自定义的html标签
    一个组件就是一个vm实例对象

### Vue中组件的语法
    全局组件
        Vue.component(name,{配置项})
    局部组件
        components:{
            name:{
                配置项
            }
        }

### 非根组件配置项的注意点
    不能写el; 必须写template,指定模板
    data必须得是一个函数;函数返回的对象才是真正的数据仓库

### 组件的使用细节
    1. 不要和html5的规范产生冲突
        ----组件的命名不能使用已有的html标签 (组件命名的时候加个v-)
        ----table下只能跟tr这种类型的元素 (is属性来指定将tr最终渲染成哪个组件)
            table                   table
                <v-row></v-row>       <tr is="v-row"></tr>

    2. 组件上使用@ 注册的是vue的自定义事件
        <v-row @click="fn"></v-row>

    3. 组件上的标签属性分3拨
            props属性 : 出现在了组件props配置中属性
                子组件要接收的数据
            vue指令   : v-开头的属性
                不同的指令有不同的意义
            非props属性: 排除以上两种 都是非props属性
                class
                子组件会继承下来

