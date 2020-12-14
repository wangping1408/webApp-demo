//连接mongodb数据库
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console,"we're connected!"));