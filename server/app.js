const Koa = require('koa')
const Router = require('@koa/router')
const mongo = require('./db')

mongo.connectToServer()

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = "Hello"
});

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);   