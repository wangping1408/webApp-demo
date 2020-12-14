db.account.insert({
    _id:{
        type:"vip",
        accountId:"1234"
    },
    name:"王建林",
    age:"38",
    balance:100,
    contact:["1383838438","刚果镇","刚果"]
})


db.account.find()
db.account.find({age:31})
db.account.find({age:{$eq:31}})
db.account.find({age:{$ne:31}})
db.account.find({balance:{$gt:100}})
db.account.find({balance:{$gte:100}})
db.account.find({balance:{$lt:100}})
db.account.find({balance:{$lte:100}})
db.account.find({balance:{$in:[100,-100]}})
db.account.find({balance:{$nin:[100,-100]}})
db.account.find({age:{$exists:true}})
//type must be represented as a number or a string
db.account.find({_id:{$type:"string"}}) //$type没有启作用
db.account.find({$and:[{age:{$gt:30}},{balance:{$eq:1}}]})
db.account.find({$or:[{age:{$gt:30}},{balance:{$eq:1}}]})
db.account.find({$nor:[{age:{$gt:30}},{balance:{$eq:10}}]})
db.account.find({balance:{$not:{$eq:10}}})
db.account.find({balance:{$ne:10}})
db.account.find({contact:{$all:["中国","江苏"]}})
db.account.find({contact:{$elemMatch:{$eq:'江苏',$ne:3}}})
db.account.find({name:{$regex:/远/}})
db.account.find({name:{$in:[/3/,/达/]}})
db.account.find({"_id.type":"vip"})


//obj 是一个游标
var obj = db.account.find()
while(obj.hasNext()){
    print(obj.next())
}

var obj = db.account.find()
obj.forEach((account)=>{
    print(account)
})


var obj = db.account.find()
obj.limit(5)

var obj = db.account.find()
obj.skip(20)

var obj = db.account.find()
obj.count()

var obj = db.account.find()
obj.sort({_id:1})

//sort --> skip --> limit
var obj = db.account.find()
obj.sort({age:1}).skip(3).limit(5)

//count组合使用
var obj = db.account.find()
obj.limit(5).count(true)



var obj = db.account.find({},{balance:1,name:1,contact:{$slice:[1,2]},_id:0})
obj.sort({balance:-1})

var obj = db.account.find({},{balance:1,name:1,contact:{$elemMatch:{$eq:"北京"}},_id:0})
obj.sort({balance:-1})

