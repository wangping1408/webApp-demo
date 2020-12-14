const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

//每一次请求过来 当前回调都会被塞进异步队列  等待v8引擎过来执行
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world\n')
})


//服务启动时 当前回调会被塞到异步队列中
server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})