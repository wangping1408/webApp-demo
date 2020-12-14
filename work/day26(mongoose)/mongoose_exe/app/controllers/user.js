const userModel = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config")
module.exports={
    //注册功能
    async addUser(ctx){
        //对前端传来的数据进行检验
        ctx.verifyParams({
            //不写required 默认required为true
            name:{type:"string",required:true},
            password:{type:"string",required:true},
            gender:{type:"string",required:true},//性别
            avatarUrl:{type:"string",required:false},//头像
            headLine:{type:"string",required:false},//一句话简介
            education:{type:"array",itemType:"object",required:false}//教育经历
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
        ctx.request.body.password = password;

        //连接数据库 往数据库中新增一个文档
        //create方法返回的是一个promise 这个promise持有的值就是刚刚入库的数据
        let user = await userModel.create(ctx.request.body);
        //query本质上是一个promise 当前promise持有的值就是查询得到的文档
        user = await userModel.findById(user._id)

        ctx.body=user;
    },
    //登录功能
    async login(ctx){
        //对前端传来的数据进行检验(只有能力校验body中的json数据)
        ctx.verifyParams({
            name:{type:"string",required:true},
            password:{type:"string",required:true}
        })
        //拿到前端传过来的name & password
        let name = ctx.request.body.name
        let password = ctx.request.body.password
        //实现登录
        let users = await userModel.find({name}).select("+password");
        if(users.length <= 0){
            ctx.throw(404,"该用户不存在")
        }
        //name对应的用户是存在的 校验密码
        const flag = bcrypt.compareSync(password,users[0].password);
        if(!flag){
            ctx.throw(401,"密码错误")
        }

        //登录成功 生成token返回到前端
        const token = jwt.sign({_id:users[0]._id,name},config.tokenKey,
                                { expiresIn:config.expiresIn})
        ctx.body={
            token
        }
    },
    //上传头像
    async avatar(ctx){
        const avatar = ctx.request.files.avatar;
        const name = avatar.path.split("\\").pop()
        ctx.body={
            path:`http://localhost:8000/img/${name}`
        }
    },
    //查询所有用户(分页&模糊查询)
    async getAllUser(ctx){
        //const page = +ctx.query.page;//显示第几页
        //const num = +ctx.query.num;//每页显示几条
        let {page=1,num=10,q=""} = ctx.query;
        console.log(page,num,q)
        page = Math.max(1,+page);
        num = Math.max(1,+num);
        const users = await userModel.find({name:new RegExp(q)}).skip((page-1)*num).limit(num)
        ctx.body=users
    },
    //根据id查询用户
    async getUserById(ctx){
        //先决条件
        const id = ctx.params.id;
        const user = await userModel.findById(id)
        ctx.body = user
    },
    //根据id修改用户
    async updateUserById(ctx){
        ctx.verifyParams({
            //不写required 默认required为true
            name:{type:"string",required:false},
            password:{type:"string",required:false},
            gender:{type:"string",required:false},//性别
            avatarUrl:{type:"string",required:false},//头像
            headLine:{type:"string",required:false},//一句话简介
            education:{type:"array",itemType:"object",required:false}//教育经历
        })

        const id = ctx.params.id;

        const user = await userModel.findByIdAndUpdate(id,ctx.request.body,{new:true})

        ctx.body = user;
    },
    //根据id删除用户
    async delUserById(ctx){
        const id = ctx.params.id;
        await userModel.findByIdAndRemove(id)
        ctx.status=204;
    },
}