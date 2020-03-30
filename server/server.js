const path = require('path')
const Koa = require('koa')
const send = require('koa-send')

const serverMode = process.env.NODE_ENV === 'server'

const staticRouter = require('./routers/static')
const pageRouter = serverMode ? require('./routers/ssr/dev-ssr') : require('./routers/ssr')
const apiRouter = require('./routers/api')

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    await next()
  } catch (error) {
    ctx.status = 500
    if (serverMode) {
      ctx.body = error.message
    } else {
      ctx.body = 'please try again later'
    }
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

app.listen(3001, () => {
  console.log('http://127.0.0.1:3001/app')
})
