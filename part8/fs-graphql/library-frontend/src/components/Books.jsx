import { useQuery } from '@apollo/client/react'
import { useState } from 'react'

import { ALL_BOOKS } from '../queries'

// Defining specific styles for the selected genre button:
const buttonStyle = (selected) => ({
  fontWeight: selected ? 'bold' : 'normal',
  border: selected ? '2px solid #1976d2' : '1px solid #999',
  backgroundColor: selected ? '#e3f2fd' : 'white',
  borderRadius: '4px',
  marginRight: '6px',
  marginBottom: '6px',
  padding: '4px 10px',
  cursor: 'pointer',
})

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  
  const genresResult = useQuery(ALL_BOOKS)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })
  
  if (!props.show) {
    return null
  }

  if (genresResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }
  
  // Computing genres for filtering:
  const books = genresResult.data.allBooks
  const genres = [
    ...new Set(
	  books.flatMap((book) => book.genres)
    ),
  ]
  
  // Filtering the books by genre if a genre is selected (using just React):
  /*
  const booksToShow = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books
  */
  
  // Filtering the books by genre if a genre is selected (using a GraphQL query):
  const booksToShow = booksResult.data.allBooks

  return (
    <div>
      <h2>Books</h2>
	  
	  <p>In genre: <strong>{selectedGenre ?? 'All Genres'}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksToShow.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
	  
	  <div>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
			style={buttonStyle(selectedGenre === genre)}
          >
            {genre}
          </button>
        ))}
      
        <button
          onClick={() => setSelectedGenre(null)}
		  style={buttonStyle(selectedGenre === null)}
        >
          All Genres
        </button>
      </div>
    </div>
  )
}

export default Books
