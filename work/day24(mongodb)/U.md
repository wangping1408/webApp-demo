db.account.find()

db.account.insert({name2:"达姆"})

db.account.remove({_id:ObjectId("5f21177eea9f2d281cfd5d47")})


//文档的复制
db.account.find({_id:"123abc"},{_id:0})
            .forEach(function(doc){
                var newDoc = doc;
                newDoc.name = "zzz";
                db.account.insert(newDoc)
            })


//普通字段
db.account.update({age:41},{name:"刘渊1"}) //全量更新
db.account.update({_id:"123abc"},{$set:{name:"张弛",age:"21"}}) //局部更新
db.account.update({_id:"123abc"},{$set:{info:{brank:"渣打银行"}}}) //局部更新
db.account.update({_id:"123abc"},{$unset:{brank:"xxx"}}) //局部更新
db.account.update({_id:"123abc"},{$unset:{contact1:"xxx",contact2:"xxx",contac3:"xxx",contac:"xxx"}})
db.account.update({_id:"123abc"},{$rename:{age:"name"}}) //局部更新
db.account.update({_id:"123abc"},{$rename:{age:"name"}}) //局部更新
db.account.update({_id:"123abc"},{$rename:{"info.brank":"brank"}}) //局部更新
db.account.update({_id:"123abc"},{$inc:{"balance":1000}}) //局部更新
db.account.update({_id:"123abc"},{$mul:{"balance":2}}) //局部更新
db.account.update({_id:"123abc"},{$min:{"balance":1600}}) //局部更新
db.account.update({_id:"123abc"},{$max:{"balance":"1"}}) //局部更新

//数组字段
db.account.update({_id:"123abc"},{$addToSet:{"contact1":"亚洲"}}) //局部更新
db.account.update({_id:"123abc"},{$push:{"contac3":"亚洲"}}) //局部更新
db.account.update({_id:"123abc"},{$addToSet:{"contact":"亚洲"}}) //局部更新
db.account.update({_id:"123abc"},{$push:{"contact":"亚洲"}}) //局部更新

db.account.update({_id:"123abc"},{$addToSet:{"contact":{
    $each:[1,2,3,4]
}}}) //局部更新
db.account.update({_id:"123abc"},{$push:{"contact":{
    $each:["A","B","C"]
}}})
db.account.update({_id:"123abc"},{$push:{"contact":{
    $each:[],
    $position:0,
    $sort:-1,
    $slice:5
}}})
db.account.update({_id:"123abc"},{$push:{"contact":{
    $each:["xx","yy"],
    $position:1
}}})
db.account.update({_id:"123abc"},{$pop:{"contact":-1}})
db.account.update({_id:"123abc"},{$pull:{"contact":"xx"}})
db.account.update({_id:"123abc"},{$pullAll:{"contact":["yy","亚洲"]}})
db.account.update({_id:"123abc"},{$set:{"contact.1":"test"}})

//配置项 批量更新
db.account.update({info:{$exists:true}},{$rename:{"info.brank":"brank"}},{multi:true})


db.account.update({_id:"123"},{name:"周冬雨"},{upsert:true})

//save 插入&更新的综合方法 如果对应的id存在则更新 如果id不存在则新增
db.account.save({_id:"123",name:"马冬梅",age:18})
db.account.save({_id:"1234",name:"马冬梅",age:18})





