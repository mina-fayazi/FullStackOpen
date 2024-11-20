# Part 3 - Full Stack Open

This directory contains the exercises for Part 3 of the FullStackOpen course.

## Exercises

### 3.1: Phonebook Backend, step 1
- Create a `Node.js` application to serve the phonebook data from the server.
- Define a route at `/api/persons` that returns the phonebook entries as a JSON response.
- Use `Express` to build the backend server.

### 3.2: Phonebook Backend, step 2
- Add a new route `/info` that responds with an informational message.
- The response includes:
  - The total number of entries in the phonebook.
  - The current date and time.

### 3.3: Phonebook Backend, step 3
- Implement functionality to fetch information for a single phonebook entry by its ID.
- Define a route at `/api/persons/:id` that:
  - Searches for the entry with the given ID.
  - Returns the matching entry as a JSON response if found.
  - Responds with a `404 Not Found` status and an appropriate error message if the entry does not exist.