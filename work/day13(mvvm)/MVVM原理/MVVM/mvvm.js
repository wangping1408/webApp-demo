function MVVM(options) {
    // this : vm
    this.$options = options;
    var data = this._data = this.$options.data;
    var me = this;

    //Object.keys(data) : 返回对应对象的可枚举属性的名字!!
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });

    //数据劫持
    observe(data, this);

    //模板的解析 (如何解析指令 {{}})
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    //key : data中的每一个键名
    //_proxy方法调用的次数和data中属性的个数有关
    _proxy: function(key) {
        var me = this; // me : vm

        //给vm对象添加新的属性!!  属性的名字来至于data配置
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    }
};