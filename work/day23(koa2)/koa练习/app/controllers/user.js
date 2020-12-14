const users = require("../data/data")
let id = 0;
module.exports={
    addUser(ctx){
        let name = ctx.request.body.name;
        let age = ctx.request.body.age;
        let user = {
            id:id++,
            name,
            age
        }
        users.push(user);
        ctx.body=user;
    },
    getAllUser(ctx){
        ctx.body=users
    },
    getUserById(ctx){
        const id = +ctx.params.id;
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