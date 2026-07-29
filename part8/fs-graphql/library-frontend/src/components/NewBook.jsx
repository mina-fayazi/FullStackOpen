import { useState } from 'react'

import { useMutation } from '@apollo/client/react'

import {
  ADD_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
} from '../queries'

// Helper for updating cached ALL_BOOKS queries:
const updateBooksCache = (cache, addedBook) => {

  const updateBooks = (variables) => {
    cache.updateQuery(
      {
        query: ALL_BOOKS,
        variables,
      },
      (data) => {
        if (!data) {
          return data
        }
		
		// Duplicate check to ensure the same book is not added twice:
		if (data.allBooks.some(book => book.id === addedBook.id)) {
          return data
        }

        return {
          allBooks: data.allBooks.concat(addedBook),
        }
      }
    )
  }
  
  // Update query used by Recommendations.jsx:
  updateBooks()
  
  // Update "All Genres" in Books.jsx:
  updateBooks({ genre: null })

  // Update every genre the new book belongs to:
  addedBook.genres.forEach((genre) => {
    updateBooks({
      genre,
    })
  })
}

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
      updateBooksCache(
        cache,
        response.data.addBook
      )
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
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
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
