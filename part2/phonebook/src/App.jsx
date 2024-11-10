import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
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