//拿到任意一个模块的config配置 已经 axios实例
//最终这个函数要返回对应的发请求的函数
import {loading,success,fail} from "./toast"
export default function (config,axios) {
    let obj = {};
    for(let key in config.api){
      //当前这个函数是真正发请求的函数
      //当前函数应该要返回一个promise
      //并且这个promise所持有的值 必须得是请求拿到的值
      let {url,method,transfromType,toast,data:configData,hooks,corsUrl,token}  = config.api[key];
      //data : 组件上发请求时传过来的参数
      obj[key]=async function (data={},options={}) {
        //将钩子一个个取出来
        hooks = hooks||{};
        const {beforeReq,reqSuccess,reqFail} = hooks;
        //來自于组件的配置解构出来
        const {toast:toastFromC} = options;
        //提升toastFromC优先级
        toastFromC !== undefined ? toast = toastFromC:"";
        data = data || {}
        configData = configData || {}
        //组合配置中的data
        data = Object.assign(configData,data)

        //根据isForm来对data进行装换
        let transformData = "";
        if(transfromType === "form"){
          transformData = new FormData();
          //加上组件上来的数据
          for(let key in data){
            transformData.append(key,data[key])
          }
        }else{
          transformData = data;
        }


        //处理一下跨域
        if(corsUrl){
          //当前逻辑被执行一次
          url = corsUrl + url;
          corsUrl = ""
        }

        //处理token
        let headers = {}
        if(typeof token === "function"){
          let Authorization = token();
          headers={Authorization}
        }

        //接口返回的数据
        let body = "";
        try {
          //发请求前
          beforeReq&&beforeReq.call(config)
          if(toast){loading&&loading()}
          //发送请求去拿对应接口的数据
          switch (method){
            case "get":
            case "delete":
              body = await axios({
                url,
                method,
                params:transformData,
                headers
              })
              break;
            case "put":
            case "post":
              body = await axios({
                url,
                method,
                data:transformData,
                headers
              })
              break;
          }
          //发请求后
          reqSuccess&&reqSuccess.call(config,body)
          if(toast){success&&success()}
        }catch (e) {
          //发请求出现异常
          reqFail&&reqFail.call(config)
          if(toast){fail&&fail()};
          //一般要将异常信息包装失败状态的promise继续往外传递
          return Promise.reject(e)
        }

        return body
      }
    }
    return obj
}
