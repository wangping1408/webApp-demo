### 如何创建promise实例?
    new Promise(exec)

    promise.then(()=>{},()=>{})

    async函数的执行结果也是一个promise

### 不同的创建形式 promise对象的状态的确定是不一样的?
    new Promise(exec): 执行器exec先同步执行 promise实例才被创建
        如果执行器出错了 那么promise是失败状态的
        如果执行器的resolve被调用了 那么promise是成功状态
        如果执行器的reject被调用了 那么promise是失败状态
        如果执行器没有进入上面三个流程中任意一个 那么promise是初始化状态

    then方法返回的promise是什么状态 跟then中参数(回调函数)有关
        如果回调函数在执行过程中出错 那么promise是失败状态的
        如果回调函数成功的返回一个值 那么promise是成功状态的
        如果回调函数成功的返回一个promise 那么then方法返回的promise跟这个回调返回的promise保持一致的状态

    asyns函数返回的promise 看async函数的执行结果 规则和then一致