function Observer(data) {
    //data:data配置
    //this:Observer的实例对象
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        //me,this:Observer的实例对象
        var me = this;
        //data配置中所有属性名组成的数组!
        Object.keys(data).forEach(function(key) {
            //key: data中每一个属性名!
            //data[key]: 对应key在data中val
            //data中有多少个属性 下面这一行代码就会被执行多少次!
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        //data中的 key val
        //this.data 整个data数据
        //this : Observer的实例对象
        this.defineReactive(this.data, key, val);
    },
    defineReactive: function(data, key, val) {
        var dep = new Dep();

        //如果val不是对象 observe会直接return
        var childObj = observe(val);

        //数据劫持的代码!!!
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    //dep是当前key对应的闭包!
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal; //下一把再进来时 newval也会变成oldval
                childObj = observe(newVal);
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    //value:data中的数据
    //vm:mvvm的实例对象
    if (!value || typeof value !== 'object') {
        //如果data不是一个对象 或者 data是null
        return;
    }
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub); //将{{}}的watcher 放到damu dep的subs数组中
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        //修改的那个属性所对应的dep
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;