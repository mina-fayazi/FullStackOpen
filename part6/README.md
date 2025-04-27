# Part 6 - Full Stack Open

This directory contains the exercises for Part 6 of the FullStackOpen course.

## Exercises

### 6.1: Unicafe Revisited, step 1
- Implement the reducer for managing feedback counts using the `Redux` library:
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
