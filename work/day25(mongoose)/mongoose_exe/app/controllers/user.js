const userModel = require("../models/user")
const bcrypt = require("bcryptjs")
module.exports={
    //注册功能
    async addUser(ctx){
        //对前端传来的数据进行检验
        ctx.verifyParams({
            name:{type:"string",required:true},
            password:{type:"string",required:true}
        })
        //拿到前端传过来的name & password
        let name = ctx.request.body.name
        let password = ctx.request.body.password

        //业务检验  当前系统注册用户时 用户名不能重复
        let flag = await userModel.findOne({name});
        if(flag){
            ctx.throw(409,"用户名不能重复")
        }

        //当前这个password是明文 我们进行加密处理
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password,salt)

        //连接数据库 往数据库中新增一个文档
        //create方法返回的是一个promise 这个promise持有的值就是刚刚入库的数据
        let user = await userModel.create({name,password});
        //query本质上是一个promise 当前promise持有的值就是查询得到的文档
        user = await userModel.findById(user._id)

        ctx.body=user;
    },
    getAllUser(ctx){
        ctx.body=users
    },
    getUserById(ctx){
        //先决条件
        const id = +ctx.params.id;
        if(id < 0){
            ctx.throw(412,"id不能小于0")
        }
        const user = users.find(item => item.id === id)
        ctx.body = user
    },
    updateUserById(ctx){
        let name = ctx.request.body.name;
        let age = ctx.request.body.age;
        const id = +ctx.params.id;
        const user = users.find(item => item.id === id);
        name ? user.name =name:"";
        age ? user.age =age:"";
        ctx.body = user;
    },
    delUserById(ctx){
        const id = +ctx.params.id;
        const index = users.findIndex(item => item.id === id);
        users.splice(index,1);
        ctx.status=204;
    },
}