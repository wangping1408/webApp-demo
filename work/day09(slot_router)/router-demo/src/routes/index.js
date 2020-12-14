import home from "../pages/home"
import about from "../pages/about"
import news from "../pages/news"
import message from "../pages/message"
import user from "../pages/user"
export default [
  {
    path:"/home",
    component:home,
    children:[
      {path:"news",component:news},
      {path:"message",component:message},
      {path:"",redirect:"news"}
    ]
  },
  {path:"/about",component:about},
  {path:"/user/:id",component:user},
  {path:"/",redirect:"/about"}
]
