const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const { ObjectId } = require('mongodb')
const mongo = require('./db')

mongo.connectToServer()

const app = new Koa()
const router = new Router()
app.use(cors())

router.get('/locations', async (ctx) => {
  ctx.body = await mongo.getDb().collection('locations').find().toArray()
})

router.get('/locations/:id', async (ctx) => {
  const location = await mongo.getDb().collection('locations').findOne({ 'controllers.id': ctx.params.id })

  if (!location) ctx.throw(404)

  const { controllerId } = location.controllers.find((controller) => controller.id === ctx.params.id)

  const boxes = await mongo.getDb().collection('boxes').find({ locationId: location._id, controllerId }).toArray()

  ctx.body = { ...location, boxes }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(1337)
