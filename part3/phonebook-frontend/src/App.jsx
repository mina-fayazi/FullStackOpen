import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })
  
  // Fetch initial persons data for the phonebook from the server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  // Display notification message
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, 5000)
  }
  
  // Handle form submission
  const addPerson = (event) => {
    event.preventDefault()
    
	// Check if the new name already exists in the phonebook
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
			showNotification(`Updated ${newName}'s number`, 'success')
          })
          .catch(error => {
            if (error.response && error.response.status === 400) {
              // Handle validation errors
              showNotification(error.response.data.error, 'error')
            } else if (error.response && error.response.status === 404) {
              // Handle deletion errors
              showNotification(`The contact ${newName} was already deleted from the server`, 'error')
              setPersons(persons.filter(person => person.id !== existingPerson.id))
            } else {
              // Handle any other unexpected errors
              showNotification(`An unexpected error occurred`, 'error')
            }
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
		  showNotification(`Added ${newName}`, 'success')
        })
		.catch(error => {
          showNotification(error.response.data.error, 'error') // Show server-side error
        })
    }
  }
  
  // Handle deletion of a person
  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
		  showNotification(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          showNotification(`The contact ${name} was already deleted from the server`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
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
	  
	  <Notification message={notification.message} type={notification.type} />
	  
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
	  
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
	  
    </div>
  )
}

export default App