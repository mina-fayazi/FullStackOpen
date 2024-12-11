const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input
          id="name"
          name="name"
          value={newName}
          onChange={onNameChange}
          autoComplete="name"
        />
      </div>
      <div>
        Number: <input
          id="number"
          name="number"
          value={newNumber}
          onChange={onNumberChange}
          autoComplete="number"
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm