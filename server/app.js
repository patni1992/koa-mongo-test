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

router.get('/boxes/:id', async (ctx) => {
  let box = await mongo
    .getDb()
    .collection('boxes')
    .aggregate([
      { $match: { _id: ObjectId(ctx.params.id) } },
      {
        $lookup: {
          from: 'parcels',
          localField: '_id',
          foreignField: 'boxId',
          as: 'parcel'
        }
      }
    ])
    .toArray()

  if (!box) ctx.throw(404)

  box = { ...box[0] }

  box.parcel = box.parcel.length ? box.parcel[0] : null

  if (box.parcel) {
    const carrier = await mongo
      .getDb()
      .collection('carriers')
      .findOne({ _id: ObjectId(box.parcel.carrier) }, { projection: { username: true } })

    box.parcel.carrier = carrier
  }

  ctx.body = box
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(1337)
