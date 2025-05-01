import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// Generate a unique ID for each anecdote
// const getId = () => (100000 * Math.random()).toFixed(0)

// Create a slice for anecdotes using Redux Toolkit
const anecdoteSlice = createSlice({
  name: 'anecdotes', // Slice name
  initialState: [], // Initial state for this slice
  reducers: {
    // Reducer to handle voting for an anecdote
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state
        .map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
        .sort((a, b) => b.votes - a.votes) // Sort anecdotes by votes
    },
    
    // Reducer to handle adding an anecdote object
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
	
	// Reducer to handle replacing the anecdotes array directly
	setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes) // Sort anecdotes by votes
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

// Asynchronous action creator to save votes to the backend
export const voteAnecdoteAsync = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(voteAnecdote(updated))
  }
}

export default anecdoteSlice.reducer