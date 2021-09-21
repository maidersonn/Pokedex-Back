const db = require('../configs/db')
const { sql } = require('slonik')

const create = async () => {
  try {
    await db.query(sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `)

    await db.query(sql`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        surname TEXT NOT NULL,
        address TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        profile_pic TEXT,
        bio TEXT,
        hash TEXT NOT NULL,
        token TEXT DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
        updated_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
      )
    `)
    console.info('> creation done! 🚀')
  } catch (error) {
    console.info('> creation error! ❌')
    console.info('>', error.message)
  }
}

create()