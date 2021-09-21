const { user } = require('../../queries/auth')

module.exports = (db) => async (req, res, next) => {
  const { accessToken } = res.locals

  const result = await user(db)({ accessToken })

  if (result.error || !result) {
    return next({
      statusCode: 401,
      error: new Error(result.message),
    })
  }

  res.status(200).json({
    success: true,
    user: result,
  })
}