import Vue from 'vue'
import App from '../components-detail/index.vue'

const v = new Vue({
  el: '#app',
  data: {
    name: 'detail'
  },
  render (h) {
    return h(App)
  }
})
