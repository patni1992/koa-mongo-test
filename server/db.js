const { MongoClient } = require('mongodb')

const uriMongo = process.env.URI_MONGO || 'mongodb://localhost:27017/koa-mongo'

const client = new MongoClient(uriMongo, { useUnifiedTopology: true })
let db

async function connectDb() {
  const conn = await client.connect()
  db = conn.db()
  return client
}

function getDb() {
  return db
}

module.exports = { connectDb, getDb }
