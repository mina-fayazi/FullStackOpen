import { createSlice } from '@reduxjs/toolkit'

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

export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer