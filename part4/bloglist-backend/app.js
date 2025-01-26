require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message)
    process.exit(1)  // Exit the process if connection fails
  }
}

// Connect to the database
connectToDB()

app.use(cors())
app.use(express.json())

// Route handlers
app.use('/api/blogs', blogsRouter)

// Middleware for handling unknown endpoints
app.use(middleware.unknownEndpoint)

// Error handling middleware
app.use(middleware.errorHandler)

module.exports = app