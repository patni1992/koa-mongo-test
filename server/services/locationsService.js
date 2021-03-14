const createError = require('http-errors')
const mongo = require('../db')

async function getLocation(id) {
  const location = await mongo.getDb().collection('locations').findOne({ 'controllers.id': id })

  if (!location) throw createError(404)

  const { controllerId } = location.controllers.find((controller) => controller.id === id)

  const boxes = await mongo.getDb().collection('boxes').find({ locationId: location._id, controllerId }).toArray()

  return { ...location, boxes }
}

async function getLocations() {
  const location = await mongo.getDb().collection('locations').find().toArray()

  return location
}

module.exports = {
  getLocation,
  getLocations
}
