### async函数的返回值
    async函数的执行结果也是一个promise
    asyns函数返回的promise 看async函数的执行结果 规则和then一致

### await
    await 表达式 (这个表达式最好是可以返回一个promise实例的)

    await等的是一个promise;等这个promise的状态发生改变时;再决定要不要执行await下面代码

            async function(){
                await 可以返回一个promise实例的表达式1
                await 可以返回一个promise实例的表达式2
                ....后续代码
            }

            执行一个返回promise实例的表达式1;
            promise.then(()=>{
                retrun 执行一个返回promise实例的表达式2;
            }).then(()=>{
                ....后续代码
            })


### await

    (async function(){
        async test function(){
            await 可以返回一个promise实例的表达式1
            await 可以返回一个promise实例的表达式2
            ....后续代码
        }
        await test()
        外部代码...
    })()


    执行一个返回promise实例的表达式1;
    promise.then(()=>{
        retrun 执行一个返回promise实例的表达式2;
    }).then(()=>{
        ....后续代码
    })

    内部async函数返回的promise.then(()=>{
        外部代码...
    })

    只有等后续代码执行完毕后 async函数返回promise的状态才能确定;
    只有状态确定了 外部代码才有机会被执行