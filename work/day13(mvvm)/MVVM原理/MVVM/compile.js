function Compile(el, vm) {
    //this : Compile的实例对象
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    //如果挂载节点存在 进入下面的逻辑
    if (this.$el) {
        //将el掏空 所有的子节点全部转到文档碎片中
        this.$fragment = this.node2Fragment(this.$el);
        //真正的开始解析模板  所有dom层面的操作都依赖于文档碎片 所以不会引起界面的重绘
        this.init();
        //将解析完成的文档碎片挂回到挂载节点上 挂回去的是文档碎片的所有子节点
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
                child;

        //firstChild 是不会剔除文本节点的
        while (child = el.firstChild) {
            //将el中的第一个子节点剪切到文档碎片中
            fragment.appendChild(child);
        }

        //将el掏空 所有的子节点全部转到文档碎片中
        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        //el.childNodes 拿到挂载节点下的所有子节点 包括文本节点
        var childNodes = el.childNodes,
            me = this;

        //Array.prototype.slice.call(childNodes)
        //node:挂载节点下的一个个子节点
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent; //拿到子节点的内容
            //正则表达式中如果出现() 代表分组
            var reg = /\{\{(.*)\}\}/; // 匹配插值表达式

            if (me.isElementNode(node)) {
                me.compile(node);
            } else if (me.isTextNode(node) && reg.test(text)) {
                //RegExp.$1 拿到正则匹配成功之后 第一个分组的内容
                me.compileText(node, RegExp.$1);
            }

            //将节点的子节点拿出来 确定存在 进一步解析
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    //一个等待被解析的元素节点
    compile: function(node) {
        //拿出元素节点上的所有属性
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            //attr 当前元素节点上所有属性节点
            var attrName = attr.name;//属性节点的名字
            if (me.isDirective(attrName)) {
                var exp = attr.value; //属性节点的值
                var dir = attrName.substring(2);
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    //除了事件指令以外的指令 渲染的位置
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                //将指令从dom节点移除
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },





    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    //node:当前的元素节点
    //vm:vm实例对象
    // exp:指令对应的表达式
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        //构建了一个watcher对象
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    //根据exp 去vm实例对象中 找exp对应的值
    _getVMVal: function(vm, exp) {
        var val = vm._data; //data配置
        exp = exp.split('.'); //[damu,name]
        exp.forEach(function(k) { //k:damu ; k:name
            //已经命中数据劫持的逻辑了!!
            // 只是当前Dep.target没有被修改过 所以数据劫持暂时没有启太大的作用
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    //node 是对应的元素节点  value是表达式对应的值
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};