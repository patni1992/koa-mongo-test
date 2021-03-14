const Router = require('@koa/router')
const boxService = require('../services/boxService')

const router = new Router()

router.get('/boxes/:id', async (ctx) => {
  ctx.body = await boxService.getBox(ctx.params.id)
})

module.exports = router
