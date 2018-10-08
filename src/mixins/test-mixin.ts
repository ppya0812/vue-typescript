import { Component, Vue } from 'vue-property-decorator'
/**
 * Mixin test
 *
 * @export
 * @class TestMixin
 * @extends {Vue}
 */
@Component
export default class TestMixin extends Vue {
  private testMixinArg: string = 'this is test mixin arg'

  private testMixinFunc (): void {
    console.log('this string is from test mixin console.log')
  }
}
