//实现对后台路由的批量注册
//util.promisify 可以将一个node异常优先的api promise化
const fs = require("fs");
const util = require("util")
const readdirP = util.promisify(fs.readdir)
module.exports= async function (app) {
   const files =  await readdirP(__dirname);
   files.forEach((fileName)=>{
        if(fileName!== "index.js"){
            let router = require(`./${fileName}`);

            app.use(router.routes()).use(router.allowedMethods())
        }
   })
}