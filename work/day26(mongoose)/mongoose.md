### 项目可以编写验证逻辑的位置
    前端验证
    后台路由层面可以做验证
    连接数据库ODM框架可以做验证
    数据库层面自己也能做验证

### ODM框架mongoose
    ODM:对象文档模型 (操作数据库相关的框架)

### 安装mongoose
    npm i mongoose

### 连接数据库
    const mongoose = require("mongoose");
    //如果没有对应的数据库 mongoose会选择新建一个
    mongoose.connect("mongodb://localhost:27017/数据库名称",{
       useNewUrlParser: true,
       useUnifiedTopology: true
    });
    //拿到连接对象
    const db = mongoose.connection;
    //如果连接失败
    db.on('error', console.error.bind(console, 'connection error:'));
    //如果连接成功
    db.once('open', console.log.bind(console,"we're connected!"));


### 映射集合(创建Schema)
    //引入mongoose  找到Schema函数
    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;
    //创建Schema实例  第一个参数是用来映射集合中一个个字段的对象
    const userSchema = new Schema({
        name:String
    })

### 拿到文档的操作工具(创建model)
    //"user":代表集合的名称
    //userSchema:上一步创建的Schema对象
    const userModel = mongoose.model("user",userSchema);
    module.exports = userModel;

### moongose的CRUD (借助于上一步产生的model)
    C(创建) model.create(doc)
    R(查询 查询操作返回的基本都是一个query对象
            query本质上是一个promise;该promise持有的值就是我们查询得到的值)
        model.findOne({key:val})
        model.findById(id)
        model.find({key:val})


### 打通全栈流程(前后端&数据库)
    ajax请求 --> koa路由 --> mongoose --> mongodb
    跨域问题:
        1. cors
            npm i koa-cors
            const cors = require("koa-cors")
            app.use(cors())
        2. 部署时将前后台应用部署同一个服务器上
            让我们的后台服务器提供静态资源服务
                npm i koa-static
                const serve = require("koa-static");
                app.use(serve(__dirname + '/public'));

### 密码的加密加盐(注册)
    npm i bcryptjs
    生成盐: const salt = bcrypt.genSaltSync(num) //num的值越大最后生成的密文越难解密
    加密  : const psw = bcrypt.hashSync(password,salt) //password:明文密码 psw:加密后的密码
    对比明文密码 和 加密密码是否是同一个密码:
            bcrypt.compareSync(明文,密文)

### token(登录)
    npm install jsonwebtoken
    生成token:
        const token = jwt.sign(用户对象,密钥,{expiresIn:"7d"})
    解析token
        const decoded = jwt.verify(token, 密钥);

### 上传图片(上传头像)
    要两个前提条件:
            1. 用户必须处于登录状态
            2.登录的用户和头像指定的用户必须是同一个用户

