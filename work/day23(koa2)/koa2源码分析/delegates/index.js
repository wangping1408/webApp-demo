
/**
 * Expose `Delegator`.
 */

module.exports = Delegator;

function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto; //content文件往外暴露的对象
  this.target = target; //'response' & 'request'
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}


//下述方法中的this 指向的都是中间件函数的第一个参数
Delegator.prototype.method = function(name){
  var proto = this.proto; // content文件往外暴露的对象
  var target = this.target; //'response' & 'request'
  this.methods.push(name);

  //proto["attachment"] = function(){}
  proto[name] = function(){
    // ctx.response.attachment.apply(ctx.response)
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};

Delegator.prototype.access = function(name){
  return this.getter(name).setter(name);
};

Delegator.prototype.getter = function(name){
  var proto = this.proto; //content文件往外暴露的对象
  var target = this.target;////'response' & 'request'
  this.getters.push(name);

  proto.__defineGetter__(name, function(){
    return this[target][name];
  });

  return this;
};

Delegator.prototype.setter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, function(val){
    return this[target][name] = val;
  });

  return this;
};

Delegator.prototype.fluent = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);

  proto[name] = function(val){
    if ('undefined' != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };

  return this;
};
