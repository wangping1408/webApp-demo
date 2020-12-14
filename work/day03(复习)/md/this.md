### 如何学习js相关的api(方法)
    1. 搞清楚这个api是干嘛的
    2. 搞清楚这个api参数的个数 以及每一个参数的作用
    3. 搞清楚这个api的返回值是什么


### this指向问题
    ES5:
        看函数调用位置的调用形式
            (this:window) 普通调用: fn()
            (this:obj   ) 隐式调用: obj.fn()
            (this:obj   ) 显示调用: fn.call(obj,1,2,3)  fn.apply(obj,[1,2,3])  => obj.fn(1,2,3)
            (this:实例对象)构造调用: new fn()
        隐式丢失
            赋值: var fn = doucment.write; fn("123") --> 报错
                    doucment.write("123")  : this-->doucment
                    var fn = doucment.write;
                    fn("123") : this-->window
            传参:
                var obj = {
                    name:"damu",
                    marry:function(){
                        console.log(this.name + " ❤ 冬雨")
                    }
                }
                obj.marry()  -->  "damu ❤ 冬雨";

                setTimout(obj.marry,2000)

        解决隐式丢失: 使用硬绑定函数
                setTimout(obj.marry.bind(obj),2000)

