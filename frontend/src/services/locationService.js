import client from '../api/client'

function fetchLocations() {
  return client('locations')
}

function fetchLocation(id) {
  return client(`locations/${id}`)
}

export { fetchLocations, fetchLocation }
