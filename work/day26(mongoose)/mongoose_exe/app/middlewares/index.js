const jwt = require("jsonwebtoken");
const config = require("../config/config")
const auth = require('basic-auth')
module.exports={
    //验证用户是否登录
    async auth(ctx,next){
        try {
           /* const token = ctx.request.headers.authorization;*/
            var token = auth(ctx.request).name;
            const user = jwt.verify(token,config.tokenKey);
            console.log(user);
            if(user){
                //将用户信息保存在ctx上下文中 以便后续的中间件使用
                ctx.state.user =user;
            }
        }catch (e) {
            //一旦抛错 后续代码是不会执行的
            ctx.throw(403,"拒绝访问 登录信息过期")
        }
        //说明用户存在 可以进行下一步操作
        await next()
    },
    //权限检验
    async access(ctx,next){
        const userId = ctx.state.user._id; //登录用户的id
        const id = ctx.params.id; //上传头像的id
        if(userId === id){
           await next()
        }else {
            ctx.throw(412,"id参数有问题")
        }
    }
}