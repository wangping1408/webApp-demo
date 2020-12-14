import axios from "axios";
import config from "./config"

//拿到模块级别的钩子
const hooks = config.hooks||{};
const {beforeReq,reqSuccess,reqFail} = hooks


//创建axios实例
const axiosObj = axios.create({
  baseURL: config.baseUrl,
  timeout: config.timeOut,
})


axiosObj.interceptors.request.use(function (axiosConfig) {
  beforeReq&&beforeReq.call(config,axiosConfig)
  return axiosConfig;
});

axiosObj.interceptors.response.use(function (response) {
  reqSuccess&&reqSuccess.call(config,response.data)
  return response.data;
}, function (error) {
  reqFail&&reqFail.call(config,error)
  return Promise.reject(error);
});

export default axiosObj;
