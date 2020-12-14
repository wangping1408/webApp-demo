const mongoose = require("mongoose");
//用来映射集合的
const Schema = mongoose.Schema;


const userSchema = new Schema({
    //代表这数据库中集合的一个个字段
    __v:{type:Number,select:false},
    name:{type:String}, //姓名
    password:{type:String,select:false},//密码
    gender:{type:String,enum:["male","female"]},//性别
    avatarUrl:{type:String},//头像
    headLine:{type:String},//一句话简介
    education:{  //教育经历
        type:[{
            school:String,//学校名称
            major:String, //专业
            diploma:{     //文凭
                type:String,
                //当前这个枚举没启作用???
                enum:["1","2","3","4","5","6"] //1: 小学,2:初中,3:高中....
            }
        }]
    }
})
const userModel = mongoose.model("user",userSchema);
module.exports = userModel;