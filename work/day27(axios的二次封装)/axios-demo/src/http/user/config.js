export default {
  name:"user",
  //在处理跨域时 baseUrl不能加 一旦加了 代表直接去访问接口服务器;不会走代理
  // baseUrl:"http://localhost:8000",
  timeOut:2000,
  api:{
    getAllUser:{
      url:"/user/getAll",
      method:"get",
      corsUrl:"/8000"
    },
    deleteUserById:{
      url:"/user/delUser/5f28bd43ab9f4a1f8c52a18c",
      method:"delete",
      corsUrl:"/8000",
      //定义成函数才是动态的
      token(){
        //要么去仓库中拿最新的值
        //要么去localstorage中拿最新的值
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjI4YmQ0M2FiOWY0YTFmOGM1MmExOGMiLCJuYW1lIjoiZGFtdSIsImlhdCI6MTU5NjUwNTQxNCwiZXhwIjoxNTk3MTEwMjE0fQ.oSn78IW78d4fRwd1AlMBEr9RzfRD0n-1U7leA6iTmhU"
      }
    }
  }
}
