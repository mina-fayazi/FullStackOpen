require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const Person = require('./models/person')

const app = express()

// Middleware to handle JSON body parsing
app.use(express.json())

// Middleware for handling CORS
app.use(cors())

// Middleware for logging
// Create a custom token to log the request body for POST requests
morgan.token('body', (req) => JSON.stringify(req.body))

// Use morgan with custom format to include body in POST requests
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => req.method !== 'POST', // Only include the body for POST requests
  })
)

// Use morgan for general logging in "tiny" format
app.use(morgan('tiny'))

// Define the /api/persons GET route
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    //console.log('Retrieved persons:', persons)
    response.json(persons)
  })
})

// Add the route for adding a new phonebook entry
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number is missing'
    })
  }
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      //console.log('Saved person:', savedPerson)
      response.json(savedPerson)
    })
    .catch((error) => next(error)) // Pass error to error handler
})

// Add the route for deleting a phonebook entry by ID
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error)) // Pass error to error handler
})

// Serve the production build of the frontend
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Middleware for handling unsupported routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with unknown endpoint
app.use(unknownEndpoint)

// Error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' }) // Handle invalid MongoDB ObjectId
  }

  next(error) // Pass unhandled errors to Express' default error handler
}

// Handler of requests with result to errors
app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})