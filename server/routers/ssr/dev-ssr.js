const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const VueServerRenderer = require('vue-server-renderer')
const clientConfig = require('../../../build/webpack.client.config')
const serverConfig = require('../../../build/webpack.server.config')
const serverRender = require('./server-render')

const mfs = new MemoryFS()
const router = new Router()

clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
const clientCompiler = webpack(clientConfig)
const serverCompiler = webpack(serverConfig)

const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
const clientManifestPath = path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json')
const templatePath = path.join(__dirname, '../../server.template.ejs')

serverCompiler.outputFileSystem = mfs

let bundle = null
let clientManifest = null
let template = fs.readFileSync(templatePath, 'utf-8')

chokidar.watch(templatePath).on('change', () => {
  template = fs.readFileSync(templatePath, 'utf-8')
})

const devMiddleware = webpackDevMiddleware(clientCompiler, {
  publicPath: clientConfig.output.publicPath,
  noInfo: true
})

app.use(devMiddleware)

clientCompiler.plugin('done', stats => {
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(err => console.warn(err))
  if (stats.errors.length) return
  clientManifest = JSON.parse(devMiddleware.fileSystem.readFileSync(clientManifestPath, 'utf-8'))
})

app.use(webpackHotMiddleware(clientCompiler))

serverCompiler.watch({}, (err, state) => {
  if (err) return err
  stats = state.toJson()
  stats.errors.forEach(err => { console.log(err, 'error') })
  stats.warnings.forEach(warn => { console.log(warn, 'warn') })
  // if (stats.errors.length) return

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

const handleSSR = async ctx => {
  if (!bundle && !clientManifest) return ctx.body = 'wait'

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest,
  })

  await serverRender(ctx, renderer, template)
}

router.get('*', handleSSR)

module.exports = router