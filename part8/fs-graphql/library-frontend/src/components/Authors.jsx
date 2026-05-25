import { useState } from 'react'

import { useQuery, useMutation } from '@apollo/client/react'

import {
  ALL_AUTHORS,
  EDIT_AUTHOR,
} from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  
  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  
  const submit = async (event) => {
    event.preventDefault()

    await editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    })

    setBorn('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
	  
	  <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Name
		  
          <select
            value={name}
            onChange={({ target }) =>
              setName(target.value)
            }
          >
            <option value="">Select Author</option>

            {authors.map((a) => (
              <option
                key={a.id}
                value={a.name}
              >
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          Born

          <input
            type="number"
            value={born}
            onChange={({ target }) =>
              setBorn(target.value)
            }
          />
        </div>

        <button type="submit">
          Update Author
        </button>
      </form>
    </div>
  )
}

export default Authors
