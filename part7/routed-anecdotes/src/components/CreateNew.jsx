import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0
    })
  }
  
  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content.inputProps} />
        </div>
        <div>
          Author
          <input {...author.inputProps} />
        </div>
        <div>
          URL for more info
          <input {...info.inputProps} />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  )

}

export default CreateNew