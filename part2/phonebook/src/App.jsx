import { useState } from 'react'

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
      <h1>Phonebook</h1>
	  <div>
        Filter shown with: <input 
			id="filter"
			name="filter"
			value={filter}
			onChange={handleFilterChange}
          />
      </div>
	  <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input
            id="name"
            name="name"
            value={newName}
            onChange={handleNameChange}
            autoComplete="name"
          />
        </div>
		<div>
          Number: <input
			id="number"
			name="number"
			value={newNumber}
			onChange={handleNumberChange}
			autoComplete="number"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App