import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')
  
  // Handle form submission
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName }

    // Update the persons list and reset input
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  
  // Handle changes in the input field
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App