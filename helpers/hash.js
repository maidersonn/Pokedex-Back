const bcrypt = require('bcrypt')
const crypto = require('crypto')

const encrypt = async password => {
  const rounds = 10
  const salt = await bcrypt.genSalt(rounds)
  return await bcrypt.hash(password, salt)
}

const compare = password => async hash => {
  return await bcrypt.compare(password, hash)
}

const createConfirmToken = () => {
  return crypto.randomBytes(64).toString('hex')
}

module.exports = {
  encrypt,
  compare,
  createConfirmToken,
}