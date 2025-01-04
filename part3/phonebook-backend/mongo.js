const mongoose = require('mongoose')

// Check if the username and password are provided
if (process.argv.length < 4) {
  console.log('Usage: node mongo.js <username> <password> [name] [number]')
  process.exit(1)
}

// Get command-line arguments
const username = encodeURIComponent(process.argv[2]) // Encode the username
const password = encodeURIComponent(process.argv[3]) // Encode the password
const name = process.argv[4]
const number = process.argv[5]

// Database connection URI
const url = `mongodb+srv://${username}:${password}@cluster0.kfay5.mongodb.net/phonebook?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.connect(url)

// Define the schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Add a new entry if name and number are provided
if (name && number) {
  const person = new Person({ name, number })
  person
    .save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error('Error saving person:', err)
      mongoose.connection.close()
    })
} else {
  // List all entries in the phonebook
  Person.find({})
    .then((persons) => {
      console.log('phonebook:')
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error('Error fetching persons:', err)
      mongoose.connection.close()
    })
}
