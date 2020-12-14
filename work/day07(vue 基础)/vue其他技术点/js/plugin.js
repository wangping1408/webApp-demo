(function (w) {
  w.plugin = Object.create(null);

  w.plugin.install = function (Vue) {
    Vue.prototype.$damu = {
      name: "达姆",
      age: 18
    }
    Vue.prototype.$eat = function () {
      console.log("一顿吃三碗")
    }
    Vue.directive('focus', {
      inserted: function (el) {
        el.focus()
      }
    })
    Vue.component("v-damu", {
      template: "<span>v-damu</span>"
    })
  }
})(window)