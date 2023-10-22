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
    console.error('Database connection error:', err)
  })

// Register CORS middleware
app.use(cors())

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Define API routes here
const userRoutes = require('../api/user/routes/user') // Bring in your user routes
app.use('/user', userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err) // Log the error
  res.status(500).json({ error: 'Internal server error' })
})

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

module.exports = app
