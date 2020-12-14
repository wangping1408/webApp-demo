import home from "../pages/home"
import about from "../pages/about"
import news from "../pages/news"
import message from "../pages/message"
import user from "../pages/user"
import userDetail from "../pages/userDetail"
import messageDetail from "../pages/messageDetail"
export default [
  {
    path:"/home",
    component:home,
    children:[
      {path:"news",component:news},
      {
        path:"message",
        component:message,
        children:[
          {path:":id",component:messageDetail,props:true},
          {path:"",redirect:"0"},
        ]
      },
      {path:"",redirect:"news"}
    ]
  },
  {path:"/about",component:about},
  {
    path:"/user",
    component:user,
    children:[
      // props:true vue-router默认只会传params
      {
        path:":id",
        component:userDetail,
        props(route){
          return {
            id:route.params.id,
            name:route.query.name
          }
        }},
      {path:"",redirect:"2"}
    ]
  },
  {path:"/",redirect:"/about"}
]


// {path:"/user/:id",component:user},
// {path:"/user",redirect:"/user/1"},

