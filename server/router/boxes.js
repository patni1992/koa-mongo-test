const Router = require('@koa/router')
const { ObjectId } = require('mongodb')
const mongo = require('../db')

const router = new Router()

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

module.exports = router
