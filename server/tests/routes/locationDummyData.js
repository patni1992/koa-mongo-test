const { ObjectId } = require('mongodb')

const location = {
  coordinatese: {
    type: 'Point',
    coordinates: [29.34678, 15.06671]
  },
  address: {
    street: 'Testgatan 24',
    zip: '55555',
    city: 'Göteborg'
  },
  controllers: [
    {
      controllerId: new ObjectId(),
      id: 'aaaa'
    },
    {
      controllerId: new ObjectId()
    }
  ],
  name: 'Test 232323 93',
  converted: true
}

module.exports = location
