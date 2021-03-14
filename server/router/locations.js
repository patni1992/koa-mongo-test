const Router = require('@koa/router')
const locationService = require('../services/locationsService')

const router = new Router()

router.get('/locations', async (ctx) => {
  ctx.body = await locationService.getLocations()
})

router.get('/locations/:id', async (ctx) => {
  ctx.body = await locationService.getLocation(ctx.params.id)
})

module.exports = router
