const { sql } = require('slonik')

const register = (db) => async ({
  email,
  name = '',
  surname = '',
  address = '',
  username,
  profilePic = '',
  bio = '',
  hash,
  token,
}) => {
  try {
    return await db.query(sql`
      INSERT INTO users (
        email, name, surname,
        address, username, profile_pic,
        bio, hash, token
      ) VALUES (
        ${email}, ${name}, ${surname},
        ${address}, ${username}, ${profilePic},
        ${bio}, ${hash}, ${token}
      )
    `)
  } catch (error) {
    console.info('> error: ', error.originalError.detail)
    return {
      error: true,
      message: error.originalError.detail,
    }
  }
}

const login = (db) => async ({
  email,
  compareFn,
}) => {
  try {
    const user = await db.maybeOne(sql`
      SELECT hash, token
      FROM users
      WHERE email LIKE ${email}
    `)

    if (!user) return {
      error: true,
      message: 'Invalid credentials',
    }

    const passwordValid = await compareFn(user.hash)

    if (!passwordValid) return {
      error: true,
      message: 'Invalid credentials',
    }

    return user.token
  } catch (error) {
    console.info('> error: ', error.originalError.detail)
    return {
      error: true,
      message: error.originalError.detail,
    }
  }
}

const user = (db) => async ({ accessToken }) => {
  try {
    const result = await db.maybeOne(sql`
      SELECT
        email, name, surname, address,
        username, profile_pic, bio
      FROM users
      WHERE token = ${accessToken}
    `)

    if (!result) return {
      error: true,
      message: 'unauthorized',
    }

    return result
  } catch (error) {
    console.info('> error: ', error.originalError.detail)
    return {
      error: true,
      message: error.originalError.detail,
    }
  }
}

module.exports = {
  register,
  login,
  user,
}