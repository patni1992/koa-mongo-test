const { ObjectId } = require('mongodb')
const createError = require('http-errors')
const { getDb } = require('../db')

async function getBox(id) {
  let box = await getDb()
    .collection('boxes')
    .aggregate([
      { $match: { _id: ObjectId(id) } },
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

  if (!box) throw createError(404)

  box = { ...box[0] }

  box.parcel = box.parcel.length ? box.parcel[0] : null

  if (box.parcel) {
    const carrier = await getDb()
      .collection('carriers')
      .findOne({ _id: ObjectId(box.parcel.carrier) }, { projection: { username: true } })

    box.parcel.carrier = carrier
  }

  return box
}

module.exports = { getBox }
