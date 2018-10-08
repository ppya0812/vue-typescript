import Vue from 'vue'
import App from '../components-index/index.vue'

// import(/* webpackPrefetch: true */ 'LoginModal') // 预加载
// 异步加载
// components: {
//   'AsyncCmp': () => import('./AsyncCmp')
// }

const v = new Vue({
  el: '#app',
  data: {
    name: 'index'
  },
  render (h) {
    return h(App)
  }
})

