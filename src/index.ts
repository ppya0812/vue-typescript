import Vue from 'vue'
import HelloComponent from './components/Hello'
import DetailComponent from './components/Hello.vue'

// import(/* webpackPrefetch: true */ 'LoginModal') // 预加载
// 异步加载
// components: {
//   'AsyncCmp': () => import('./AsyncCmp')
// }

const v = new Vue({
  el: '#app',
  template: `
  <div>
      index: <input v-model="name" type="text">
      <hello-component :name="name" :initialEnthusiasm="5" />
      <detail-component :name="name" :initialEnthusiasm="5" />
  </div>
  `,
  data: {
    name: 'index'
  },
  components: {
    HelloComponent,
    DetailComponent
  },
})

