const { MongoClient } = require('mongodb');

const urlMongo = 'mongodb://localhost:27017/koa-mongo-test';

let db;

function connectToServer() {
  MongoClient.connect(urlMongo, (err, client) => {
    if (err) throw err;

    console.log('connected');
    db = client.db();
  });
}

function getDb() {
  return db;
}

module.exports = { connectToServer, getDb };
