const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const utils = require('./utils')
const webpackBaseConfig = require('./webpack.base.config')

const webpackClientConfig = {
  output: {
    filename: utils.assetsPath('[name].[contentHash].js'),
    chunkFilename: utils.assetsPath('[name].[contentHash].js')
  },
  module: {
    rules: utils.styleLoaders()
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new CleanWebpackPlugin({}),
  ],
}

module.exports = merge(webpackBaseConfig, webpackClientConfig)