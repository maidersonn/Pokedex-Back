const router = require('express').Router()
const guard = require('../../middlewares/guard')

module.exports = (db) => {
  const register = require('./register')
  const login = require('./login')
  const me = require('./me')
  const logout = require('./logout')

  router.post('/register', register(db))
  router.post('/login', login(db))
  router.get('/me', guard, me(db))
  router.post('/logout', guard, logout(db))

  return router
}