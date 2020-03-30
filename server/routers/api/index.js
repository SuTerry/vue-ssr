const Router = require('koa-router')
const user = require('./user')

const router = new Router({ prefix: '/api' })

router.use(user.routes()).use(user.allowedMethods())

module.exports = router