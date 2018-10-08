const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin)

const utils = require('./utils')

const config = require('./config.js')
let baseWebpackConfig = require('./webpack.base.conf')

// const UglifyJS = require('uglify-es')
// const DefaultUglifyJsOptions = UglifyJS.default_options()
// const compress = DefaultUglifyJsOptions.compress
// for(let compressOption in compress) {
//     compress[compressOption] = false
// }
// compress.unused = true

// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = [
//     'vue'
//   ].concat(baseWebpackConfig.entry[name])
// })

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: config.build.mode,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:5].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:5].js') // 非入口 chunk 的名称。
  },
  // optimization: {
  //   // test 
  //   minimize: true,
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         compress,
  //         mangle: false,
  //         output: {
  //             beautify: true
  //         }
  //       },
  //     }),
  //   ]
  // },
  optimization: {
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    // chunk for the webpack runtime code and chunk manifest
    runtimeChunk: {
      name: 'manifest'
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true,
    // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: 'vendor',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')  // 其他library用
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..')
    }),
    new OptimizeCSSPlugin(
      // {
      // assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
      // cssProcessor: require('cssnano'),
      // cssProcessorOptions: {
      //     discardComments: { removeAll: true },
      //     // 避免 cssnano 重新计算 z-index
      //     safe: true,
      //     // cssnano 集成了autoprefixer的功能
      //     // 会使用到autoprefixer进行无关前缀的清理
      //     // 关闭autoprefixer功能
      //     // 使用postcss的autoprefixer功能
      //     autoprefixer: false
      // },
      // canPrint: true
      // minimize: true
    // }
    ),
    ...Object.keys(baseWebpackConfig.entry).map(item =>
      new HtmlWebpackPlugin({
        title: item,
        filename: item + '.html',
        template: 'index.html',
        inject: true,
        chunks: ['manifest', 'vendor', item],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      })
    ),
    new webpack.HashedModuleIdsPlugin(),
    //静态资源输出,将src目录下的assets文件夹复制到dist目录下
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/assets'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
    // new webpack.HotModuleReplacementPlugin(), // 会影响chunkhash
  ]
})

module.exports = prodWebpackConfig
