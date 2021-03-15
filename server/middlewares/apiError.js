async function apiError(ctx, next) {
  try {
    await next()
  } catch (err) {
    const { statusCode, status, message } = err
    ctx.type = 'json'
    ctx.status = statusCode || status || 500
    ctx.body = {
      status: 'error',
      message
    }
    ctx.app.emit('error', err, ctx)
  }
}

module.exports = apiError
