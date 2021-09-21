const slonik = require('slonik')

const SLONIK_URL = 'postgres://user1:1234@localhost:5432/prueba'

const db = slonik.createPool(SLONIK_URL)

module.exports = db