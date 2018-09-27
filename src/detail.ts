import Vue from 'vue'
import DetailComponent from './components/Detail.vue'

const v = new Vue({
  el: '#app',
  template: `
  <div>
      detail: <input v-model="name" type="text">
      <detail-component :name="name" :initialEnthusiasm="5" />
  </div>
  `,
  data: {
    name: 'detail'
  },
  components: {
    DetailComponent
  }
})
