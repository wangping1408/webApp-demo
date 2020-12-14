export default {
  //从localStorage中读取数据
  get(key,defVal){
    let val = localStorage.getItem(key);
    return  val ? JSON.parse(val) : defVal;
  },
  //去localStorage中设置数据
  set(key,val){
    localStorage.setItem(key,JSON.stringify(val))
  }
}
