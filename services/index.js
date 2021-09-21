const router = require('express').Router()

module.exports = (db) => {
  const auth = require('./auth')

  router.use('/auth', auth(db))

  return router
}