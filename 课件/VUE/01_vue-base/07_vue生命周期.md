# vue生命周期
    每个 Vue 实例在被创建时都要经过一系列的初始化过程
        ——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。
    同时在这个过程中也会运行一些叫做生命周期钩子的函数，
    这给了用户在不同阶段添加自己的代码的机会
#  钩子函数
    1)	vue生命周期函数
        初始化显示
            * beforeCreate()
            * created()
            * beforeMount()
            * mounted()
        更新状态: this.xxx = value
            * beforeUpdate()
            * updated()
        销毁vue实例: vm.$destory()
            * beforeDestroy()
            * destroyed()

    2)	常用的生命周期方法
        created()/mounted(): 发送ajax请求, 启动定时器等异步任务
        beforeDestory(): 做收尾工作, 如: 清除定时器
    
# mounted生命周期钩子的问题
	mounted生命周期钩子中并不代表界面已经渲染成功
	注意 mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，
	可以在 mounted 内部使用 vm.$nextTick
	
# 组件嵌套时父子组件生命周期钩子是如何调用的
	    先调父组件的beforeCreate
		先调父组件的created
		先调父组件的beforeMount
		再调子组件的beforeCreate created beforeMount mounted
		最后调父组件的mounted
    
# 周期图
   ![vue生命周期](img/lifecycle.png)
    