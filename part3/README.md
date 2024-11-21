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

### 3.4: Phonebook Backend, step 4
- Add functionality to delete a phonebook entry.
- Define a `DELETE` route at `/api/persons/:id` that:
  - Removes the entry with the specified ID from the phonebook.
  - Responds with a `204 No Content` status upon successful deletion.

### 3.5: Phonebook Backend, step 5
- Add functionality to add new entries to the phonebook.
- Define a `POST` route at `/api/persons` that:
  - Adds a new entry to the phonebook.
  - Ensures that the `name` and `number` fields are included in the request body.
  - Validates that the `name` field is unique, returning a `400 Bad Request` status and an error message if the name already exists.

### 3.6: Phonebook Backend, step 6
- Enhance the phonebook backend by implementing error handling for creating new entries. This ensures that invalid requests are properly managed, and users are informed of the errors with appropriate messages.

### 3.7: Phonebook Backend, step 7
- Add the `morgan` middleware for logging requests.
- Configure `morgan` to use the "tiny" format.

### 3.8\*: Phonebook Backend, step 8
- Extend `morgan` to log the data sent in HTTP POST requests.
- Note: Avoid logging sensitive data in production environments to comply with privacy regulations.