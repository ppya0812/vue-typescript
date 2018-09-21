const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 通过 npm 安装
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = require('./config.js')
const baseWebpackConfig = require('./webpack.base.conf')

const assetsPath = function (_path) {
  return path.posix.join(config.build.assetsSubDirectory, _path)
}

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: config.build.mode,
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].[hash:5].js'),
    chunkFilename: assetsPath('js/[id].[hash:5].js')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'webpack4 typescript',
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')  // 其他library用
    })
  ]
})

module.exports = prodWebpackConfig
