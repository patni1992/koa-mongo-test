const Koa = require('koa')
const cors = require('@koa/cors')
const mongo = require('./db')
const router = require('./router')

mongo.connectToServer()

const app = new Koa()

app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

app.listen(1337)
