### 什么是vue的插槽
    实现html的传递(父向子进行html片段的传递)
    支持子向父进行数据传递

### vue的插槽有什么作用
    可以定制化组件的部分模板

### 普通插槽
    需要传递的html片段在哪准备?
        在组件使用位置上准备 以组件的innerHtml形式出现
            <v-child>
                <template>
                    ......html片段.....
                </template>
            </v-child>
    html片段在什么时候会被使用上?
        在组件模板覆盖整个组件标签时;组件模板上的slot标签会被
        对应的html片段覆盖
             v-child:{
                template:`<slot></slot>`
             }
### 具名插槽
        <slot name="a"></slot>
        <slot name="b"></slot>

        <template slot="a">
            ......html片段.....
        </template>
         <template slot="b">
            ......html片段.....
        </template>

### 作用域插槽
    <slot name="a" data1="xxx" data2="yyy"></slot>
    <slot name="b" data1="xxx" data2="yyy"></slot>

    <template slot="a" slot-scope="obj">
        ......html片段.....  {{obj.data1}}
    </template>
     <template slot="b"  slot-scope="{data1,data2}">
        ......html片段.....  {{data1}}
    </template>

### 插槽新版本的语法
        slot标签的语法没有发生改变;template上的写法有了新的语法
            <template slot="a" slot-scope="obj">
                ......html片段.....  {{obj.data1}}
            </template>

            <template v-slot:a="obj">
                ......html片段.....  {{obj.data1}}
            </template>

            <template #a="{data1,data2}">
                ......html片段.....  {{data1}}
            </template>
