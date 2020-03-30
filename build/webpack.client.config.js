const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const webpackBaseConfig = require('./webpack.base.config')
const config = require('../config')['server']

const webpackDevConfig = {
  devServer: {
    port: config.port,
    host: '127.0.0.1',
    overlay: {
      errors: true,
    },
    historyApiFallback: {
      index: '/static/index.html'
    },
    open: true,
    hot: true
  },
  module: {
    rules: utils.styleLoaders()
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'template.html')
    }),
  ],
}

module.exports = merge(webpackBaseConfig, webpackDevConfig)