const jwt = require('jsonwebtoken')
const User = require('../models/user')

// tokenExtractor middleware
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')  // Extract the token (after 'Bearer ')
  } else {
    request.token = null  // If no token is found, set it to null
  }

  next()  // Move to the next middleware
}

// userExtractor middleware
const userExtractor = async (request, response, next) => {
  // Verify token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  // Find the user based on the decoded token
  request.user = await User.findById(decodedToken.id)
  next()
}

// errorHandler middleware
const errorHandler = (error, request, response, next) => {
  //console.error(error.message) // Log error for debugging

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error) // Pass error to default Express handler if not handled
}

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler
}