const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const utils = require('./utils')
const webpackBaseConfig = require('./webpack.base.config')

const resolve = dir => path.join(__dirname, '..', dir)

const webpackServerConfig = {
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  entry: resolve('client/entry-server.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: resolve('server-build')
  },
  module: {
    rules: utils.styleLoaders('node'),
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': JSON.stringify('server')
    }),
    new VueServerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
    }
  }
}

module.exports = merge(webpackBaseConfig, webpackServerConfig)