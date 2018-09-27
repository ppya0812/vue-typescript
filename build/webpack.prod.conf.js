const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('./utils')

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = require('./config.js')
let baseWebpackConfig = require('./webpack.base.conf')

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
  optimization: {
    // chunk for the webpack runtime code and chunk manifest
    runtimeChunk: {
      name: 'manifest'
    },
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
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }),
  ]
})

module.exports = prodWebpackConfig
