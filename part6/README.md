# Part 6 - Full Stack Open

This directory contains the exercises for Part 6 of the FullStackOpen course.

## Exercises

### 6.1: Unicafe Revisited, step 1
- Implement the reducer for managing feedback counts using the `Redux` library for the unicafe project from part 1:
  - The state should contain counts for good, neutral (ok), and bad feedback.
  - Ensure the reducer returns the correct initial state when called with undefined state.
  - Ensure the reducer updates the correct feedback count based on the dispatched action.
- Implement tests for the reducer:
  - Use the `deep-freeze` library to ensure immutability.
  - Verify that the state is not mutated and a new state is returned correctly for each action type.

### 6.2: Unicafe Revisited, step 2
- Implement the user interface for giving feedback:
  - Add buttons for giving good, neutral, and bad feedback.
  - Add a button for resetting the feedback statistics to zero.
- The application should dynamically update statistics based on the feedback given.

### 6.3: Anecdotes, step 1
- Implement voting functionality using `Redux` for the anecdotes application from part 1:
  - Store the number of votes for each anecdote in the `Redux` store.
- When a user votes for an anecdote:
  - Dispatch an action that updates the vote count of the selected anecdote in the store.
  - Ensure the component updates to reflect the new number of votes.

### 6.4: Anecdotes, step 2
- Implement functionality for adding new anecdotes.
- The user should be able to submit a new anecdote using an uncontrolled form input.
- When a new anecdote is submitted:
  - Dispatch an action that adds the new anecdote to the `Redux` store.
  - Make sure the component updates to display the newly added anecdote.

### 6.5: Anecdotes, step 3
- Ensure anecdotes are ordered by the number of votes, highest first.
- Sort the anecdotes before rendering them:
  - Anecdotes with more votes should appear higher in the list.
  - After voting or adding a new anecdote, the order should automatically update.

### 6.6: Anecdotes, step 4
- Refactor the code by separating the creation of action objects into action creator functions.
- Move all action creators to the `src/reducers/anecdoteReducer.js` file.
- Update your components to use these action creators when dispatching actions, instead of directly creating action objects inside the component.

### 6.7: Anecdotes, step 5
- Create a new component called `AnecdoteForm` for adding a new anecdote:
  - The form and its submission handling should now be inside `AnecdoteForm`.
  - When the form is submitted, dispatch the action to add a new anecdote.
- Keep the `App` component cleaner by simply rendering the `AnecdoteForm` component.

### 6.8: Anecdotes, step 6
- Create a new component called `AnecdoteList` for rendering the anecdote list and voting for anecdotes:
  - Display the list of anecdotes inside `AnecdoteList`.
  - Handle the voting functionality (dispatching the vote action) inside this component.
- The `App` component should now only render the `AnecdoteForm` and `AnecdoteList` components, keeping it clean and modular.

### 6.9: Better Anecdotes, step 7
- Implement filtering functionality to control which anecdotes are displayed:
  - Add a new `Filter` component for rendering a text input that lets users filter anecdotes based on text content.
  - When the filter input changes, dispatch an action to update the filter value in the Redux store.
- Store the filter state in the Redux store:
  - Create a new reducer for managing the filter state.
  - Define appropriate action types and action creators for updating the filter.
  - Use `combineReducers` to combine the anecdote and filter reducers into a single root reducer.
- Update the `AnecdoteList` component:
  - Only display anecdotes that match the current filter text.
  - Ensure the filtering is case-insensitive and reflects live updates as the user types.
