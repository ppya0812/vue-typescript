'use strict'
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./config.js')
const utils = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: {
    index: './src/page/index.ts',
    detail: './src/page/detail.ts'
  },
// 会将 process.env.NODE_ENV 的值设为 development: 启用 NamedChunksPlugin 和 NamedModulesPlugin。
// production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [utils.resolve('src')],
        options: {
          loaders: {
            ts: 'ts-loader',
            tsx: 'babel-loader!ts-loader'
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [utils.resolve('src')],
        // loader: 'happypack/loader?id=happyBabel'
        // loader: 'awesome-typescript-loader'
        use: [
          // 保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。
          // postinstall清除
          'cache-loader', // 节省近1000ms 将结果缓存到磁盘里
          // {
          //   loader: 'thread-loader',
          //   options: {
          //       workers: require('os').cpus().length - 1,
          //   },
          // },
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/],
              transpileOnly: true, // 快速增量构建
              // 使用 TypeScript 内置 watch mode API，可以明显减少每次迭代时重新构建的模块数量
              experimentalWatchApi: true,
            }
          },
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [utils.resolve('src'), utils.resolve('test')]
      },
      {
        test: /\.(css|less|scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'sass-loader', 'postcss-loader'],
        exclude: /node_modules/,
        include: [utils.resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:5].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:5].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:5].[ext]')
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': utils.resolve('src'),
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin(), // 另起线程处理tslint校验,会慢1000ms左右
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
      Vue: 'vue'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
      chunkFilename: 'css/[name].[contenthash:5].css',
    })
  ]
}

