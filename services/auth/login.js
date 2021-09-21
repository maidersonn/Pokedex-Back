const { login } = require('../../queries/auth')
const { compare } = require('../../helpers/hash')

module.exports = (db) => async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next({
      error: new Error('email or password needed')
    })
  }

  const result = await login(db)({ ...req.body, compareFn: compare(password) })

  if (result.error) {
    return next({
      error: new Error(result.message)
    })
  }

  res.status(200).json({
    success: true,
    accessToken: result,
  })
}