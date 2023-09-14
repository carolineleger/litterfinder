const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('../config/db')

const app = express()

mongoose
  .connect(config.database)
  .then(() => {
    console.log('Database is connected')
  })
  .catch((err) => {
    console.log({ database_error: err })
  })

// Register CORS middleware
app.use(cors())

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Define your API routes here
const userRoutes = require('../api/user/routes/user') // Bring in your user routes
app.use('/user', userRoutes)

module.exports = app
