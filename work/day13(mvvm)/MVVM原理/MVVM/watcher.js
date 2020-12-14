function Watcher(vm, exp, cb) {
    //this : Watcher的实例对象
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;

    //每一个watcher身上都有一个depids这个属性
    this.depIds = {};
    this.value = this.get();
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();//拿到最新的值
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep; //在{{}}的watcher中注入damu dep的id
        }
    },


    /*  get方法执行完毕之后:
            {{}}对应的watcher.depIds:{0:damudep,1:namedep}
            v-html对应的watcher.depIds:{0:damudep,1:namedep}
            damudep.subs:[{{}}.watcher,v-html.watcher]
            namedep.subs:[{{}}.watcher,v-html.watcher]
     */
    get: function() {
        //打开target的开关
        Dep.target = this;//解析哪一个指令 当前this就是哪一个指令对应的watcher
        var value = this.getVMVal(); //不是为了去data中找exp的值! 实际上是为了让代码重新对exp的每一个数据发起一次访问
        //关闭target的开关
        Dep.target = null;
        return value;
    },

    getVMVal: function() {
        var exp = this.exp.split('.'); // ["damu","name"]
        /*
        val:{
            damu:{
                name:"达姆",
                age:18
            }
        }
        val:{
            name:"达姆",
            age:18
        }
        val:"达姆"
        */
        var val = this.vm._data;
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    }
};