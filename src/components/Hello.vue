<template>
    <div>
        <div class="hello">哈哈哈</div>
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

.hello {
    font-size: 20px;
    color: red;
}
</style>
