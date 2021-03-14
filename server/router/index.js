const Router = require('@koa/router')
const boxesRouter = require('./boxes')
const locationsRouter = require('./locations')

const apiRouter = new Router()

const nestedRoutes = [boxesRouter, locationsRouter]

nestedRoutes.forEach((router) => {
  apiRouter.use(router.routes(), router.allowedMethods())
})

module.exports = apiRouter
