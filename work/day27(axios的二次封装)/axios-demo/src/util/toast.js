import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

export function loading() {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration:0
  })
}

export function success() {
  Toast.clear()
  Toast.success({
    message: '加载成功',
    forbidClick: true,
    duration:1000
  })
}

export function fail() {
  Toast.clear()
  Toast.fail({
    message: '加载失敗',
    forbidClick: true,
    duration:1000
  })
}
