const {addUser,getAllUser,getUserById,updateUserById,delUserById} = require("../controllers/user")
module.exports=function (router) {
    router.post("/add",addUser)
    router.get("/getAll",getAllUser)
    router.get("/getUser/:id",getUserById)
    router.put("/updateUser/:id",updateUserById)
    router.del("/delUser/:id",delUserById)
}