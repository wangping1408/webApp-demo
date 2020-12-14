### 安装mongodb服务

### 安装mongodb客户端
    ctrl + t : 新开一个面板

### 什么是mongodb
    mongodb本质上来讲是一个数据库管理系统(基于js语言)
        数据库分两类:
            关系型(mySql oracle) :
                在设计集合(表)的时候;集合有哪几个字段;这几个字段能存什么类型的数据都是定死的
                在我们往集合插入数据的时候 一个字段都不能落 类型也不能出错
            非关系型(mongodb) :
                在设计集合(表)的时候;压根不用关系字段问题;
                在插入文档时可以动态的指定集合的字段;在我们往集合插入数据的时候很松散;
                想传什么传什么

### 数据库基本概念(mongodb)
    mongodb:数据库管理系统
        database:数据库
            collection:集合
                document:文档

###  database(CRUD)
        C(创建数据库) : use 不存在的数据库名字
        R(查询数据库) :
            db :查询当前处于哪一个数据库中
            show dbs:查询所有的数据库列表(不包含空的数据库)
        U(切换数据库) : use 存在的数据库名字
        D(删除数据库) : db.dropDatabase()

### collection(CRD)
        C(创建集合) : db.createCollection("user")
        R(查询数据库里的所有集合) : show collections
        D(删除对应的集合): db.users.drop()

### document(CRUD)
        C(创建文档)
            注意点: 创建文档的同时是可以同时创建集合的
            db.collection.insertOne(document,option)
            db.collection.insertMany(document,option)
            db.collection.insert(document,option)
        R(查询文档 分清数组字段和非数组字段)
            db.collection.find() : 查询所有文档
            db.collection.find(query) : 按条件筛选文档
                query:查询条件
                    {field:val} 代表文档上filed字段等于val的才能被筛选出来
                    {field:{操作符:val}} 代表文档上filed字段满足操作符的规范时才能被筛选出来
                            操作符:
                                比较操作符
                                    $eq	 匹配字段值相等的文档
                                    $ne	 匹配字段值不相等的文档
                                    $gt	 匹配字段值大于查询值的文档
                                    $gte 匹配字段值大于或等于查询值的文档
                                    $lt	 匹配字段值小于查询值的文档
                                    $lte 匹配字段值小于或等于查询值的文档
                                    $in	 匹配字段值在一个给定的数组内的文档
                                    $nin 匹配字段值不在一个给定的数组内的文档
                                字段操作符
                                    $exists	匹配包含查询字段的文档
                                    $type	匹配字段类型符合查询值的文档
                                逻辑操作符
                                    $not	匹配筛选条件不成立的文档
                                    $and	匹配多个筛选条件全部成立的文档
                                    $or	    匹配至少一个筛选条件成立的文档
                                    $nor	匹配多个筛选条件全部不成立的文档
                                数组操作符
                                     $all	    匹配数组字段中包含所有查询值的文档
                                     $elemMatch	匹配数组字段中至少存在一个值满足所有筛选条件的文档
                                正则表达式
                                     $regex  匹配指定字段满足正则表达式的文档

            游标:find方法返回的数据计算游标
                cursor.next()
                cursor.hasNext()
                cursor.forEach(<function>)
                cursor.limit(<number>)
                cursor.skip(<offset>)
                cursor.count(<applySkipLimit>)
                cursor.sort(<document>)
                    优先级: sort -> skip -> limit
                    count: 参数传true代表会考虑limit skip

            db.collection.find(query,projection) : 按query条件筛选文档;按projection过滤字段
                projection:{field:1}
                    0 不显示对应字段
                    1 显示对应字段
                    0 和 1不能混用;主键除外

        U(更新文档)
            db.collection.update(query,update,options)
                update:
                    $set   更新或新增字段
                    $unset  删除字段
                    $rename 重命名字段
                    $inc    加减字段值
                    $mul    相乘字段值
                    $min    比较减小字段值
                    $max    比较增大字段值
                    $addToSet
                    $push
                        $each
                        $position
                        $sort
                        $slice
                    $pop
                    $pull
                    $pullAll

                options:
                    {
                        multi:true, //批量更新
                        upsert:true //如果没有对应的文档这新建
                    }


        D(删除文档)
            db.collection.remove(query,options)
                query: 查询query
                options:{justOne:true} 随机删一条




###整体数据获取的流程
    ajax请求 --> koa路由 --> mongoose --> mongodb
