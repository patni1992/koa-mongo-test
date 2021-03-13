import client from '../api/client'

function fetchLocations() {
  return client('locations')
}

// eslint-disable-next-line import/prefer-default-export
export { fetchLocations }
