module.exports={
    devServer: {
        //跨单域
        //proxy: 'http://localhost:8000'
        proxy:{
            '/8000': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                pathRewrite:{
                    "^/8000":""
                }
            },
            '/8001':{
                target: 'http://localhost:8001',
                changeOrigin: true,
                pathRewrite:{
                    "^/8001":""
                }
            }
        }
    }
}