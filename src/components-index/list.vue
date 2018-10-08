<template>
  <div @click="resetList">
    <div v-for="(item, i) in listData" :key="i">{{item.name}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Inject, Prop, Provide, Vue } from 'vue-property-decorator'

import TestMixin from '@/mixins/test-mixin'

@Component({
  mixins: [TestMixin]
})
export default class List extends Vue {
  @Prop({type: Array, default: []})
  private listData!: object[]
  @Prop({type: Function, default: () => void 0 })
  private resetList!: () => void

  // @Inject() foo!: string

  private mounted() {
    console.log(this.testMixinArg)
  }
}


</script>

<style lang="less">
@import '../common.less';

.greeting {
    font-size: 20px;
}
</style>

