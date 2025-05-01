import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// Generate a unique ID for each anecdote
const getId = () => (100000 * Math.random()).toFixed(0)

// Create a slice for anecdotes using Redux Toolkit
const anecdoteSlice = createSlice({
  name: 'anecdotes', // Slice name
  initialState: [], // Initial state for this slice
  reducers: {
    // Reducer to handle voting for an anecdote
    voteAnecdote(state, action) {
      const id = action.payload // The id of the voted anecdote
      const anecdoteToVote = state.find(a => a.id === id)

      if (anecdoteToVote) {
        anecdoteToVote.votes += 1 // Increment the vote count
        state.sort((a, b) => b.votes - a.votes) // Sort anecdotes by votes (descending)
      }
    },

    // Reducer to handle creating a new anecdote
    createAnecdote(state, action) {
      const content = action.payload // The new anecdote's content
      state.push({ content, id: getId(), votes: 0 }) // Add new anecdote to state
    },
    
    // Reducer to handle adding an anecdote object
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
	
	// Reducer to handle replacing the anecdotes array directly
	setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

// Initialize the anecdotes based on the data from the server and dispatch "setAnecdotes" to add them to the store
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// Asynchronous action creator to create a new anecdote and dispatch changing the state of the store
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer