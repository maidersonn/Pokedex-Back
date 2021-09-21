const express = require('express')
const cors = require('cors')
const db = require('./configs/db')

const app = express()
app.use(cors())
app.use(express.json())

const main = require('./services')

app.use(main(db))

app.use((_, __, next) => {
  next({
    statusCode: 400,
    error: new Error('path not found')
  })
})

app.use(({ statusCode = 400, error }, _, res, __) => {
  res.status(statusCode).json({
    success: false,
    message: error.message,
  })
})

app.listen(3001, () => console.info('> Listening at port 3001...'))