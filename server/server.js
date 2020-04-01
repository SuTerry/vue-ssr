const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const send = require('koa-send')
const chalk = require('chalk')
const config = require('../config')
const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const port = config[process.env.NODE_ENV].port

const serverMode = process.env.NODE_ENV === 'server'


const app = new Koa()

global.app = app

const pageRouter = serverMode ? require('./routers/ssr/dev-ssr') : require('./routers/ssr')

app.keys = ['vue ssr tech']

app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

app.use(koaBody())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = 500
    ctx.body = error.message
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    send(ctx, '/favicon.ico', { root: path.join(__dirname, '..') })
  } else {
    await next()
  }
})

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

app.listen(port, () => {
  console.log(
    'listening on port ' + chalk.green(`http://localhost.ccopyright.com.cn:${port}`)
  )
})
