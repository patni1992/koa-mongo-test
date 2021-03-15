const request = require('supertest')
const app = require('../../app')
const { connectDb, getDb } = require('../../db')
const locationDummyData = require('./locationDummyData')

let server
let connection

beforeAll(async (done) => {
  connection = await connectDb()
  server = app.listen(1337)
  done()
})

afterAll(async (done) => {
  server.close()
  connection.close(done)
})

afterEach(async () => {
  try {
    await getDb().collection('locations').drop()
  } catch (e) {}
})

describe('locations API', () => {
  it('should return a list of locations', async () => {
    await getDb().collection('locations').insertOne(locationDummyData)
    const response = await request(server).get(`/locations`).expect('Content-Type', /json/).expect(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body[0].name).toBe(locationDummyData.name)
  })

  it('should return a single location when providing controller id', async () => {
    const document = await getDb().collection('locations').insertOne(locationDummyData)
    const location = document.ops[0]

    const response = await request(server)
      .get(`/locations/${location.controllers[0].id}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body.name).toBe(location.name)
  })

  it('should return 404 when providing controller id that does not exist', async () => {
    await request(server).get(`/locations/test-id`).expect('Content-Type', /json/).expect(404)
  })
})
