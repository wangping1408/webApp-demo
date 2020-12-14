const Koa = require("koa")
const Router = require("koa-router")
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router({
    prefix:"/damu"
})


router.get("/a",(ctx)=>{
    console.log(ctx.query.name)
    ctx.body={a:"a"}
})
router.post("/a",(ctx)=>{
    ctx.body={a:"a-post"}
})
router.put("/a",(ctx)=>{
    ctx.body={a:"a-put"}
})
router.del("/a",(ctx)=>{
    ctx.body={a:"a-del"}
})

router.post("/b",(ctx)=>{
    console.log(ctx.request.body)
    ctx.body={b:"b-post"}
})
router.get("/c",(ctx,next)=>{
    ctx.body={c:"cccc"};
    next()
},(ctx)=>{
    ctx.body.d = "dddd"
})
router.get("/user/:id",(ctx)=>{
    console.log(typeof +ctx.params.id)
    ctx.body={user:"user"}
})


app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8080)