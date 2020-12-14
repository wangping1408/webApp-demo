### vue的特点
    声明式编程
    响应式数据
    数据的双向绑定

### vue编程的核心思想
    数据驱动

### api-指令
    数据绑定相关的指令
        {{}} : 插值表达式;不要使用 ++ --
        v-text : 将data中的内容作为textcontent插入到元素内
        v-html : 将data中的内容作为innerhtml插入到元素内
        v-model: 实现数据的双向绑定;一般v-model给输入型元素使用
    事件相关的指令
        v-on:事件名="回调函数(参数,$event)"
        @事件名="回调函数(参数,$event)"
        修饰符:
            .stop 阻止冒泡
            .prevent 阻止事件的默认行为
            .self 只有当事件在自身上触发时 才会执行
            .once 事件只会触发一次
            .left 鼠标左击
            .right 鼠标右击
            .middle 点击鼠标滚轮
            .13(.enter .spce ....) 结合keydown 结合输入型元素使用(代表我们按下了哪个按键)
        event
            如果事件对应的回调没有传参;那么回调的第一个参数将会是事件对象
            如果事件对应的回调拥有传参;那么是不是显示传递$event 让事件回调接受事件对象
    bind指令
        将一个不归vue管理的标签属性 强制交给vue管理
            v-bind:class="className"
            :class="className"
    流程控制
        v-show
        v-if
        v-else-if
        v-else
        v-for="item in arr"
        v-for="(item,index) in arr"
        v-for="val in obj"
        v-for="(val,key,index) in obj"
    其他
        v-pre : 跳过vue的编译
        v-once: 只让vue编译一次
        v-cloak: 结合[v-cloak]{display:none} 在编译还没有完成的情况 不然模板进行展示

### api-配置
    el   : 指定模板;确定挂载节点
    data : 存放响应式数据
    methods : 函数(事件对应的回调 普通函数)
    mounted : 生命周期钩子 在vue的生命周期中会被自动调用
