module.exports = (req, res, next) => {
  const { authorization } = req.headers

  console.info('> authorization: ', authorization)

  if (!authorization) {
    return next({
      statusCode: 401,
      error: new Error('unauthorized')
    })
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer' || !token) {
    return next({
      statusCode: 401,
      error: new Error('unauthorized')
    })
  }

  res.locals.accessToken = token

  next()
}