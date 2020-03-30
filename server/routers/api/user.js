const Router = require('koa-router')

const router = new Router({ prefix: '/user' })

router.get('/', ctx => {
  ctx.body = {
    data: process.env.NODE_ENV
  }
})

module.exports = router