import { rest } from 'msw'
import { setupServer } from 'msw/node'
import locationsResponse from './locationsResponse'

const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}/locations`, (req, res, ctx) => {
    return res(ctx.json(locationsResponse))
  })
]

function initMockServer() {
  const mockServer = setupServer(...handlers)
  mockServer.listen()
  return mockServer
}

export default initMockServer
