const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const mongo = require('./db')

mongo.connectToServer()

const app = new Koa()
const router = new Router()
app.use(cors())

router.get('/locations', async (ctx) => {
  ctx.body = await mongo.getDb().collection('locations').find().toArray()
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(1337)
