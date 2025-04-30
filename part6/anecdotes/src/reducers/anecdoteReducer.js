import { createSlice } from '@reduxjs/toolkit'

// Initial anecdote strings
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// Generate a unique ID for each anecdote
const getId = () => (100000 * Math.random()).toFixed(0)

// Convert a string into an anecdote object with id and votes
const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

// Initial state is an array of anecdote objects
const initialState = anecdotesAtStart.map(asObject)

// Create a slice for anecdotes using Redux Toolkit
const anecdoteSlice = createSlice({
  name: 'anecdotes', // Slice name
  initialState, // Initial state for this slice
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
      state.push(asObject(content)) // Add new anecdote to state
    }
  }
})

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer