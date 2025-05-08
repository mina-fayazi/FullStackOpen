import { useState } from 'react'
import {
  Routes, Route, Link,
  useParams,
  useNavigate
} from 'react-router-dom'

import About from './components/About'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const navigate = useNavigate()
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  
  const padding = {
    paddingRight: 5
  }
  
  // Find anecdote by ID
  const AnecdoteWrapper = () => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === Number(id))
    return <Anecdote anecdote={anecdote} />
  }
  
/*
  // Find anecdote by ID
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === Number(id))

  // Voting function
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
*/
  
  // Create new anecdote
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    // Show notification and redirect to homepage
    setNotification(`A new anecdote "${anecdote.content}" created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/')
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/create">Create</Link>
        <Link style={padding} to="/about">About</Link>
      </div>
	
	  <Notification message={notification} />
	
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<AnecdoteWrapper />} />
      </Routes>
	
      <Footer />
    </div>
  )
}

export default App
