const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const config = require('../config')[process.env.NODE_ENV]
const utils = require('./utils')

const serverMode = process.env.NODE_ENV === 'server'
const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  target: 'web',
  mode: serverMode ? 'development' : 'production',
  devtool: serverMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: {
    app: resolve('client/entry-client.js')
  },
  output: {
    filename: '[name].js',
    path: config.outPath,
    publicPath: config.publicPath
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              poolTimeout: 2000
            }
          },
          'vue-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              poolTimeout: 2000
            }
          },
          'babel-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|cur)/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
  },
  plugins: [
    new VueSSRClientPlugin(),
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new CopyWebpackPlugin([{
      from: resolve('client/static'),
      to: resolve('dist/static')
    }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.sass', '.css'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@pages': path.resolve(__dirname, '../client/pages'),
      '@api': path.resolve(__dirname, '../client/api'),
      '@css': path.resolve(__dirname, '../client/assets/css'),
      '@img': path.resolve(__dirname, '../client/assets/img'),
      '@components': path.resolve(__dirname, '../client/components'),
      '@js': path.resolve(__dirname, '../client/js'),
      '@plugins': path.resolve(__dirname, '../client/plugins'),
      '@static': path.resolve(__dirname, '../static'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors.js',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          name: 'common.js',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}