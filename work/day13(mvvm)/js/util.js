//对Object对象进行深度冻结
Object.deepFreeze = function (obj) {
    //看门狗
    if(Object.prototype.toString.call(obj) !== "[object Object]"){
        throw new Error("第一个参数不是Object对象");
    }

    var propsNames = Object.getOwnPropertyNames(obj)
    propsNames.forEach(function (key) {
        //第一次进来的val:"damu"
        //第二次进来的val:{
        //             name:"dy"
        //         }
        var val = obj[key];
        //可以安全的确定val肯定是一个 Object对象
        if(Object.prototype.toString.call(val) === "[object Object]"){
            Object.deepFreeze(val)
        }
    })

    //真正做冻结的代码
    return Object.freeze(obj)
}
//让我们定义的deepFreeze方法不可枚举
Object.defineProperty(Object,"deepFreeze",{
    enumerable:false
})
//让Object.prototype的toString方法 变的不能修改
Object.defineProperty(Object.prototype,"toString",{
    writable:false
})
