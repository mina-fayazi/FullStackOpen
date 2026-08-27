import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED } from './queries'
import { addBookToCache } from './utils/apolloCache'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  
  const client = useApolloClient()
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      //notify(`${addedBook.title} added`)
	  notify('A new book was added')
	  addBookToCache(client.cache, addedBook)
    },
  })
  
  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
		{!token ? (
          <button onClick={() => setPage('login')}>Login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>Add Book</button>
			<button onClick={() => setPage('recommend')}>Recommend</button>
			<button onClick={logout}>Logout</button>
          </>
        )}
      </div>
	  
	  <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} token={token} setError={notify} />
	  
	  <Recommendations show={page === 'recommend'} />
	  
	  <LoginForm show={page === 'login'} setToken={setToken} setError={notify} onLogin={() => setPage('authors')} />
    </div>
  )
}

export default App
