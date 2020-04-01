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
      let loaders = [cssLoader, postcssLoader]

      if (loader) {
        loaders.push({
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: Boolean(serverMode)
          })
        })
      }
      if (target !== 'node') {
        if (serverMode) {
          loaders.unshift('vue-style-loader')
        } else {
          loaders.unshift(MiniCssExtractPlugin.loader)
        }
      }

      loaders.unshift(threadLoader)

      return loaders
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