const createError = require('http-errors')
const { getDb } = require('../db')

async function getLocation(id) {
  const location = await getDb().collection('locations').findOne({ 'controllers.id': id })

  if (!location) throw createError(404)

  const { controllerId } = location.controllers.find((controller) => controller.id === id)

  const boxes = await getDb().collection('boxes').find({ locationId: location._id, controllerId }).toArray()

  return { ...location, boxes }
}

async function getLocations() {
  const locations = await getDb().collection('locations').find().toArray()

  return locations
}

module.exports = {
  getLocation,
  getLocations
}
