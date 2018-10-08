<template>
    <div>
      <input v-model="msg">
      <p>msg: {{msg}}</p>
      <p>computed msg: {{computedMsg}}</p>
      <list :listData="listData" :resetList="resetList"></list>
      <button @click="showList">show list</button>
      <button @click="resetList">reset list</button>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import list from './list.vue'

//   // 组件方法也可以直接声明为实例的方法

@Component({
  components: {
    list
  }
})
export default class Index extends Vue {
  // @Prop(Number) propA!: number
  // @Prop({type: [String, Boolean], default: ''}) propC!: string | boolean
  // initial data
  private msg: string | number = ''
  private listData: object[] = []

  // @Provide() private foo = this.msg

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // @Watch('msg', { immediate: true, deep: true })
  // private onMsgChanged(v: any, oldv: any) {
  // }

  // method
  private showList (): void {
    this.listData = [
      {
        name: '哈哈哈哈'
      },
      {
        name: '嘻嘻嘻嘻'
      }
    ]
  }

  //   onClick ():  {
//     window.alert(this.message)
//   }

  @Emit('reset')
  private resetList() {
    this.listData = []
  }

  // lifecycle hook
  private mounted () {
    console.log('index mounted')
    this.$on('reset', () => {
      console.log('reset')
    })
  }
}


</script>

<style lang="less">
@import '../common.less';

.greeting {
    font-size: 20px;
}
</style>
