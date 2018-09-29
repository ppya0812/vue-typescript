// 要在 TypeScript 里使用非代码资源，我们需要告诉 TypeScript 如何兼容这些导入类型

declare module "*.vue" {
  import Vue from "vue"
  export default Vue
}

declare module "*.svg" {
  const content: any;
  export default content;
}
