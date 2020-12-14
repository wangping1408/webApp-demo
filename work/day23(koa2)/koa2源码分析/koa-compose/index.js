'use strict'

/**
 * Expose compositor.
 */

module.exports = compose


//middleware 中间件数组
//compose: 高阶函数
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  //context: koa上下文; createContext吐出来的context
  //next:默认为undefined
  return function (context, next) {
    let index = -1
    return dispatch(0)


    //  dispatch是中间件函数的最近的那一层包裹
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i

      //取出对应的中间件
      //fn是我们注册的中间件  当i=0时 fn是我们第一个中间件
      let fn = middleware[i]

      //当i等中间件数组长度时 其实没有下一个中间件了 再继续调用会出错
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
