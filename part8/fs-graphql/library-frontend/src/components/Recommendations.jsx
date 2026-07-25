import { useQuery } from '@apollo/client/react'

import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
  const booksResult = useQuery(ALL_BOOKS, { skip: !show })
  
  const meResult = useQuery(ME, { skip: !show })
  
  if (!show) {
    return null
  }
  
  if (booksResult.loading || meResult.loading) {
    return <div>loading...</div>
  }
  
  if (!meResult.data?.me) {
    return <div>loading user information...</div>
  }

  const books = booksResult.data.allBooks
  const favoriteGenre = meResult.data.me.favoriteGenre

  const recommendedBooks = books.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>

      <p>Books in your favorite genre: <strong>{favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>

          {recommendedBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations