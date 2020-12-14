const http = require('http')
const jade = require('jade')

const hostname = '127.0.0.1'
const port = 3000


//{title:"damu"}  通过node来访问数据库 获取到数据库中的数据
let html = jade.renderFile('index.jade',{title:"damu"});
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(html)
})

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})