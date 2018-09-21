# vue-typescript

## webpack 有三种常用的代码分离方法：
 * 入口起点：使用 entry 配置手动地分离代码。
 * 防止重复：使用 SplitChunks 去重和分离 chunk。
 * 动态导入：通过模块的内联函数调用来分离代码。

 ## mode
  * mode: 'development':
    会将 process.env.NODE_ENV 的值设为 development: 启用 NamedChunksPlugin 和 NamedModulesPlugin。
 * mode: production
    启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
