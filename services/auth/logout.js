const { logout } = require('../../queries/auth')

module.exports = db => async (req, res, next) => {
  const { accessToken } = res.locals

  const result = await logout(db)({ accessToken })

  if (result.error) {
    return next({
      error: new Error(result.message)
    })
  }

  res.status(200).json({
    success: true,
  })
}