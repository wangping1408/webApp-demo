### 属性
    Vue.prototype.$root
    Vue.prototype.$el
    Vue.prototype.$options
    Vue.prototype.$data
### 方法
    Vue.prototype.$mount   : 相当于el配置;决定了vue的模板以及挂载节点
    Vue.prototype.$set     : 给vue添加新的响应式属性
    Vue.prototype.$watch   : 相当于watch配置
### 事件
    Vue.prototype.$on      : 给vue实例注册自定义事件
    Vue.prototype.$emit    : 触发对应vue实例的自定义事件
    Vue.prototype.$off     :
            不传参数:解除所有对应vue实例的自定义事件
            传一个参数:解除对应vue实例的对应的自定义事件
            传一个参数 传一个函数的名字:解除对应vue实例的对应的自定义事件的对应回调
    Vue.prototype.$once : 触发对应vue实例的自定义事件(只触发一次)