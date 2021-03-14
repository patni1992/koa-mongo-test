import client from '../api/client'

function fetchBox(id) {
  return client(`boxes/${id}`)
}

// eslint-disable-next-line import/prefer-default-export
export { fetchBox }
