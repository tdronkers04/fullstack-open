const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utilities/config')
const logger = require('./utilities/logger')
const middleware = require('./utilities/middleware')
const listRouter = require('./controllers/list')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MondoDB')
  })
  .catch((error) => {
    logger.error(`error connecting to MongoDB:`, error.message)
  })

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', listRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
