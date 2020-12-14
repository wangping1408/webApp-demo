const Router = require("koa-router")
const routesFn = require("../routes/user")
const userRouter = new Router({
    prefix:"/user"
})

routesFn(userRouter)

module.exports = userRouter;