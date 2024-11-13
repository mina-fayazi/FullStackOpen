import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  // Fetch initial data for the phonebook from the server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])
  
  // Handle form submission
  const addPerson = (event) => {
    event.preventDefault()
    
	// Check if the new name already exists in the phonebook
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newId = Math.max(...persons.map((p) => p.id)) + 1
      const newPerson = { name: newName, number: newNumber, id: newId }
	  setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  
  // Handle changes in the input field
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  
  // Search field
  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
	
      <h2>Phonebook</h2>
	  
	  <Filter filter={filter} onFilterChange={handleFilterChange} />
	  
	  <h3>Add a new person</h3>
	  
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
	  
      <h3>Numbers</h3>
	  
      <Persons persons={personsToShow} />
	  
    </div>
  )
}

export default App