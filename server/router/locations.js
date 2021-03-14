const Router = require('@koa/router')
const mongo = require('../db')

const router = new Router()

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

module.exports = router
