import { ALL_BOOKS } from '../queries'

// Helper for updating cached ALL_BOOKS queries:
export const addBookToCache = (cache, addedBook) => {
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
        const bookExists = data.allBooks.some( (book) => book.id === addedBook.id )
        if (bookExists) {
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
    updateBooks({ genre })
  })
}