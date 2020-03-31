const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const serverMode = process.env.NODE_ENV === 'server'

module.exports = {
  assetsPath(_path) {
    return path.posix.join('', _path)
  },
  cssLoaders(target) {

    const threadLoader = {
      loader: 'thread-loader',
      options: {
        workerParallelJobs: 50,
        poolTimeout: 2000
      }
    }

    const cssLoader = {
      loader: 'css-loader',
      options: {
        sourceMap: Boolean(serverMode)
      }
    }

    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: Boolean(serverMode)
      }
    }

    const generateLoaders = (loader, loaderOptions) => {
      const loaders = [threadLoader, cssLoader, postcssLoader]

      if (loader) {
        loaders.push({
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: Boolean(serverMode)
          })
        })
      }
      if (target === 'node') return
      if (serverMode) {
        return ['vue-style-loader'].concat(loaders)
      } else {
        return [MiniCssExtractPlugin.loader].concat(loaders)
      }
    }

    return {
      css: generateLoaders(),
      sass: generateLoaders('sass', { indentedSyntax: true }),
    }
  },
  styleLoaders(target = 'web') {
    const output = []
    const loaders = this.cssLoaders(target)

    for (const extension in loaders) {
      const loader = loaders[extension]
      output.push({
        test: new RegExp('\\.' + extension + '$'),
        use: loader
      })
    }

    return output
  },
}