import { useState } from 'react'

import { useMutation } from '@apollo/client/react'

import { ADD_BOOK, ALL_AUTHORS } from '../queries'
import { addBookToCache } from '../utils/apolloCache'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
    ],
	update: (cache, response) => {
      addBookToCache(cache, response.data.addBook)
    },
	onError: (error) => {
      props.setError(error.message)
    }
  })
  
  if (!props.show || !props.token) {
	return null
  }

  const submit = async (event) => {
    event.preventDefault()

    //console.log('add book...')
	
	if (!title || !author || !published || genres.length === 0) {
	  props.setError('All fields are required')
	  return
	}
	
	await addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    const normalizedGenre = genre.trim().toLowerCase()
    if (normalizedGenre !== '') {
      setGenres(genres.concat(normalizedGenre))
    }
    setGenre('')
  }

  return (
    <div>
	  <h2>Add a New Book</h2>
      <form onSubmit={submit}>
        <div>
		  <label>
            Title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
		  </label>
        </div>
        <div>
		  <label>
            Author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
		  </label>
        </div>
        <div>
		  <label>
            Published
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
		  </label>
        </div>
        <div>
		  <label>
		    Genre
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
		  </label>
          <button onClick={addGenre} type="button">
            Add Genre
          </button>
        </div>
        <div>Genres: {genres.join(', ')}</div>
        <button type="submit">Create Book</button>
      </form>
    </div>
  )
}

export default NewBook
