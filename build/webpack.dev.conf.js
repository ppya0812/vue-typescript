const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('./config.js')
let baseWebpackConfig = require('./webpack.base.conf')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = [
//     'vue'
//   ].concat(baseWebpackConfig.entry[name])
// })

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: config.dev.devtool,
  mode: config.dev.mode,
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    contentBase: path.join(__dirname, '../dist'), // since we use CopyWebpackPlugin.
    compress: true, // gzip压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll, // 获取文件改动的通知。轮询
    },
    // openPage: '',
    // after: app => {
    //   // 做些有趣的事
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')  // 其他library用
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    ...Object.keys(baseWebpackConfig.entry).map(item =>
      new HtmlWebpackPlugin({
        title: item,
        filename: item + '.html',
        template: 'index.html',
        inject: true,
        chunks: [item]
      }),
    ),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = devWebpackConfig
