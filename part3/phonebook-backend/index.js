const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()

// Hardcoded list of phonebook entries
let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

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

// Add the /info route
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

// Define a route to return the phonebook data
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Add the route for fetching a single resource by id
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).send(`<h1>404 Not Found</h1><p>Person with id ${id} not found.</p>`)
  }
})

// Add the route for deleting a phonebook entry by id
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

// Add the route for adding a new phonebook entry
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number is missing'
    })
  }

  // Check if name already exists
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  // Create a new person object
  const newPerson = {
    id: String(Math.floor(Math.random() * 10000)), // Generate a random id
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

// Serve the production build of the frontend
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Middleware to handle unknown endpoints
app.use((request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
})

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})