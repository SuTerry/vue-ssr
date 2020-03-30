const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const axios = require('axios')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../../build/webpack.server.config')
const config = require('../../../config')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
const router = new Router()
const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

serverCompiler.outputFileSystem = mfs

let bundle = null

serverCompiler.watch({}, (err, state) => {
  if (err) return err
  stats = state.toJson()
  stats.errors.forEach(err => { console.log(err, 'error') })
  stats.warnings.forEach(warn => { console.log(warn, 'warn') })

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

const handleSSR = async ctx => {
  if (!bundle) return ctx.body = 'wait'
  const clientManifestResp = await axios.get(`http://127.0.0.1:${config.server.port}/static/vue-ssr-client-manifest.json`)
  const clientManifest = clientManifestResp.data
  const template = fs.readFileSync(path.join(__dirname, '../../server.template.ejs'), 'utf-8')
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest,
  })

  await serverRender(ctx, renderer, template)
}

router.get('*', handleSSR)

module.exports = router