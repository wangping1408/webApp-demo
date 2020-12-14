const {addUser,getAllUser,getUserById,
    updateUserById,delUserById,login,avatar,test} = require("../controllers/user")
const {auth,access} = require("../middlewares/index")
module.exports=function (router) {
    router.get("/test",test)
    //用户注册对应的路由
    router.post("/add",addUser)
    //用户登录对应的路由
    router.post("/login",login)
    //用户上传头像的路由
    router.post("/:id/avatar",auth,access,avatar)
    //查询所有用户 (當前这个接口是一个开发接口 不用做鉴权)
    router.get("/getAll",getAllUser)
    //根据id查询用户
    router.get("/getUser/:id",getUserById)
    //根据id修改用户
    router.put("/updateUser/:id",updateUserById)
    //根据id删除用户
    router.del("/delUser/:id",delUserById)
}