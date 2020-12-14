export default {
  name:"contact",
  baseUrl:"http://localhost:9000/api",
  timeOut:2000,
  api:{
    getContactList:{
      url:"/contactList",
      method:"get",
      toast:true, //代表是否要开启轻提示
      data:{b:"b"}, //也可以在配置中携带请求数据
      hooks:{  //自定义钩子
        beforeReq(){console.log("beforeReq 请求级别",this.name)},
        reqSuccess(body){console.log("reqSuccess 请求级别",this.name,body);body.damu="damu"},
        reqFail(){console.log("reqFail 请求级别",this.name)},
      }
    },
    deleteContact:{
      url:"/contact",
      method:"delete"
    },
    addContactByForm:{
      url:"/contact/new/form",
      method:"post",
      transfromType:"form",  //当前请求体要使用formdata的格式
      data:{b:"b"}
    },
    addContactByJson:{
      url:"/contact/new/json",
      method:"post"
    },
    editContact:{
      url:"/contact/edit",
      method:"put"
    }
  },
  hooks:{
    beforeReq(){console.log("beforeReq 模块级别",this.name)},
    reqSuccess(body){console.log("reqSuccess 模块级别",this.name);body.age=18},
    reqFail(){console.log("reqFail 模块级别",this.name)},
  }
}
