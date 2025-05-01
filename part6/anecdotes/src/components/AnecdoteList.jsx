import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

// A component for rendering the anecdote list
const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  )

  const vote = (anecdote) => {
    dispatch(voteAnecdoteAsync(anecdote))
	dispatch(showNotification(`You voted: '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList