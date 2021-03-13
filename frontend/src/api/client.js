function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'content-type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return window.fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      const responseBody = await response.json()
      return responseBody
    }
    const errorMessage = await response.text()
    return Promise.reject(new Error(errorMessage))
  })
}

export default client
