import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { getAll } from './services/anecdotes'

const App = () => {
  // Fetch data from json-server
  const dispatch = useDispatch()
  useEffect(() => {
    getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App