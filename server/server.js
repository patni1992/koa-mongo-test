const dotenv = require('dotenv')
const { connectDb } = require('./db')
const app = require('./app')

const port = process.env.PORT || 1337

dotenv.config()

const listen = () => app.listen(port)

connectDb().then(listen)
