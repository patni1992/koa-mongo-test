const Koa = require('koa')
const cors = require('@koa/cors')
const router = require('./router')
const apiError = require('./middlewares/apiError')

const app = new Koa()

app.use(apiError)
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

module.exports = app
