<template>
    <div>
        <div class="greeting">哈哈哈{{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['name', 'initialEnthusiasm'],
  data() {
    return {
      enthusiasm: this.initialEnthusiasm
    }
  },
  methods: {
    increment() { this.enthusiasm ++ },
    decrement() {
      if (this.enthusiasm > 1) {
        this.enthusiasm--
      }
    }
  },
  computed: {
    exclamationMarks(): string {
      return Array(this.enthusiasm + 1).join('!')
    }
  }
})
</script>

<style lang="less">
@import '../common.less';

.greeting {
    font-size: 20px;
}
</style>
