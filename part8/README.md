# Part 8 - Full Stack Open

This directory contains the exercises for Part 8 of the FullStackOpen course.

## Exercises

### 8.1: The Number of Books and Authors
- Copy the contents of the `https://github.com/fullstack-hy2020/fs-graphql` repository into the project root to create a `GraphQL` backend for a small library application using Apollo Server.
- Install the backend dependencies using `npm install` in the `library-backend` folder.
- Implement the following GraphQL queries:
  - `bookCount` returns the total number of books.
  - `authorCount` returns the total number of authors.
- Ensure the following query works correctly:

```graphql
query {
  bookCount
  authorCount
}
```

### 8.2: All Books
- Implement the `allBooks` query to return the details of all books in the library.
- Ensure each returned book includes:
  - `title`
  - `author`
  - `published`
  - `genres`
- The backend should support the following query:

```graphql
query {
  allBooks {
    title
    author
    published
    genres
  }
}
```

### 8.3: All Authors
- Implement the `allAuthors` query to return the details of all authors.
- Add a computed field called `bookCount` for each author.
- Ensure the query returns the number of books written by each author.
- The backend should support the following query:

```graphql
query {
  allAuthors {
    name
    bookCount
  }
}
```

### 8.4: Books of an Author
- Extend the `allBooks` query to support filtering by author.
- Add an optional `author` argument to the query.
- Ensure only books written by the specified author are returned.
- The backend should support queries such as:

```graphql
query {
  allBooks(author: "Robert Martin") {
    title
  }
}
```

### 8.5: Books by Genre
- Extend the `allBooks` query to support filtering by genre.
- Add an optional `genre` argument to the query.
- Ensure only books matching the specified genre are returned.
- Support filtering by both `author` and `genre` simultaneously.
- The backend should support queries such as:

```graphql
query {
  allBooks(genre: "refactoring") {
    title
    author
  }
}
```

and

```graphql
query {
  allBooks(author: "Robert Martin", genre: "refactoring") {
    title
    author
  }
}
```

### 8.6: Adding a Book
- Implement the `addBook` mutation for adding new books to the library.
- Ensure the mutation accepts:
  - `title`
  - `author`
  - `published`
  - `genres`
- If the given author does not already exist in the system:
  - Automatically create and save the author.
- The backend should support mutations such as:

```graphql
mutation {
  addBook(
    title: "NoSQL Distilled",
    author: "Martin Fowler",
    published: 2012,
    genres: ["database", "nosql"]
  ) {
    title
    author
  }
}
```

or

```graphql
mutation {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title,
    author
  }
}
```

- If a new author is added through the mutation:
  - Since the mutation does not save the birth year of authors yet, the `born` field is set to `null` for newly added authors.
  - The author becomes available through the `allAuthors` query together with the correct `bookCount`.
- The following query should correctly return the newly added author information:

```graphql
query {
  allAuthors {
    name
    born
    bookCount
  }
}
```

### 8.7: Updating the Birth Year of an Author
- Implement the `editAuthor` mutation for updating an author's birth year.
- Add support for:
  - `name`
  - `setBornTo`
- If the author exists:
  - Return the updated author.
- If the author does not exist:
  - Return `null`.
- The backend should support mutations such as:

```graphql
mutation {
  editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
    name
    born
  }
}
```

### 8.8: Authors View
- Install the frontend dependencies using `npm install` in the `library-frontend` folder.
- Implement an `Authors` view that fetches and displays all authors from the GraphQL backend.
- Use Apollo Client (`useQuery`) to retrieve data from the `allAuthors` query.
- Display the following fields in a table:
  - `name`
  - `born`
  - `bookCount`

### 8.9: Books View
- Implement a `Books` view that displays all books from the backend using the `allBooks` query.
- The view should exclude genres from the displayed output.
- Display the following fields:
  - `title`
  - `author`
  - `published`

### 8.10: Adding a Book
- Implement functionality to add new books using the `addBook` mutation.
- Create a form in the `NewBook` component that allows users to input:
  - `title`
  - `author`
  - `published`
  - `genres`
- Allow users to dynamically add multiple genres before submitting the form.
- Ensure the following behavior:
  - After submission, both `Books` and `Authors` views must update automatically.
  - The Apollo cache or refetch mechanism must keep data consistent.
- Input fields must use proper labels (`title`, `author`, `published`, `genre`) to ensure compatibility with later tests.
- If a mutation fails, handle the error using Apollo Client’s `onError` callback.
- Display error messages using a notification component instead of using browser alerts.

### 8.11: Authors Birth Year
- Implement functionality to update an author's birth year using the `editAuthor` mutation.
- Add a form inside the `Authors` view that allows:
  - Entering an author
  - Entering a birth year
- The mutation should:
  - Update the author if they exist
  - Return `null` if the author is not found
- Ensure the `Authors` view updates automatically after a successful mutation.
- The mutation must be integrated using Apollo Client's `useMutation`.

### 8.12: Authors Birth Year Advanced
- Improve the birth year form by replacing free text input for the author name with a dropdown selection.
- Use a `<select>` element populated dynamically from the `allAuthors` query.
- Ensure:
  - Only existing authors can be selected.
  - The dropdown updates automatically when authors change.

### 8.13: Database, part 1
- Refactor the library backend into smaller, modular files (schema, resolvers, models, etc.), ensuring the application remains functional after each step.
- Introduce MongoDB as the persistent storage for authors and books using Mongoose.
- Modify the GraphQL `Book` type so that the `author` field returns a full `Author` object instead of just a string name:

```graphql
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
```

- The `addBook` mutation can still accept the author as a string, but internally it should resolve and store the correct reference.

### 8.14: Database, part 2
- Complete the integration so that all queries and mutations work correctly with MongoDB.
- Ensure:
  - `allBooks` works correctly (at least without author filtering if needed)
  - `allAuthors` returns correct data from the database
  - `addBook` correctly handles both existing and new authors
  - Books correctly reference authors via ObjectId relationships
- The `genre` filtering logic for `allBooks` may require careful handling of MongoDB query operators and array fields.

### 8.15: Database, part 3
- Implement proper validation error handling for database operations.
- If a mutation fails due to invalid data (e.g., too short title or author name), throw a `GraphQLError`.
- Ensure error messages are meaningful and returned through the GraphQL API instead of crashing the server.
- Validation should cover:
  - Book title constraints
  - Author name constraints
  - Any schema-level Mongoose validation rules

### 8.16: User and Logging In
- Extend the GraphQL schema with user authentication support:

```graphql
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  // ..
  me: User
}

type Mutation {
  // ...
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
```

- Add the following mutations:
  - `createUser(username, favoriteGenre)`
  - `login(username, password)`
- Use a shared authentication strategy (e.g., JWT with a hardcoded password for simplicity).
- Add authentication middleware so that:
  - `addBook` requires a valid token
  - `editAuthor` requires a valid token
The `me` query should return the currently authenticated user or `null` if not logged in.

### 8.17: Checkup
- Add a `_resetDatabase` mutation to support automated backend testing.:

```graphql
  type Mutation {
    // ...
    _resetDatabase: Boolean
  }
```

- Implement a resolver that clears all authors, books, and users from the database before tests are executed:

```js
const resolvers = {
  // ...
  Mutation: {
    // ...
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode')
      }
      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    },
  },
}

module.exports = resolvers
```

- The mutation is restricted to the test environment by `NODE_ENV` set to `test`.
- Throw a `GraphQLError` if the mutation is executed outside the test environment. This prevents accidental deletion of development or production data.
- The automated tests use a separate in-memory MongoDB instance, ensuring that no data in MongoDB Atlas or any other database is modified.

#### Running Tests Locally
- Navigate to the `tests-chapter4` directory.
- Install test dependencies:

```bash
npm install
```

- Run the test suite and verify that all backend tests pass successfully.:

```bash
npm test
```

#### Running Tests in GitHub Actions
- Enable the GitHub Actions workflow by uncommenting the workflow trigger configuration in `.github/workflows/test-chapter4.yml`:

```yaml
on:
  push:
    branches: [main, master]
  workflow_dispatch:
```

- Push the changes to GitHub and verify that the test workflow is completed successfully and all tests passed in GitHub Actions.

### 8.18: Listing Books
- Update the frontend to work with the refactored backend where the `author` field of a book is now an `Author` object instead of a string.
- Modify the `ALL_BOOKS` GraphQL query to request the author's `name`:

```graphql
query {
  allBooks {
    title
    published
    genres
    id
    author {
      name
    }
  }
}
```

- Update the `Books` component to display `author.name` instead of `author`.
- Verify that the list of books is rendered correctly after the backend migration to MongoDB.

### 8.19: Log In
- Implement user authentication in the frontend using the `login` mutation.
- Create a dedicated `Login` view containing a login form.
- Add a navigation menu with the following behavior:
  - When the user is **not logged in**:
    - `authors`
    - `books`
    - `login`
  - When the user is **logged in**:
    - `authors`
    - `books`
    - `add book`
    - `logout`
- Store the received JWT token after a successful login.
- Configure Apollo Client to include the token in the `Authorization` header for authenticated requests.
- Update the application so that:
  - Adding new books works only when logged in.
  - Editing an author's birth year works only when logged in.
  - The **Set birthyear** form is rendered only for authenticated users.
- Logout should:
  - Remove the stored authentication token.
  - Reset the Apollo Client cache.
  - Return the application to the logged-out state.

### 8.20: Books by Genre, part 1
- Extend the `Books` view to support filtering books by genre.
- Fetch and display all available genres from the existing book data.
- Render a button for each genre along with an **all genres** button.
- When a genre button is selected:
  - Display only books belonging to that genre.
  - Show the currently selected genre above the table.
- Implement the filtering entirely on the client side using React state without modifying the backend queries.

### 8.21: Books by Genre, part 2
- Implement a new `Recommend` view that displays book recommendations for the currently logged-in user.
- Use the authenticated `me` query to retrieve the user's favorite genre.
- Display:
  - The user's favorite genre.
  - All books belonging to that genre.
- Add a **recommend** button to the navigation menu that is visible only when the user is logged in.
- Reuse the existing `allBooks` query with genre filtering to fetch the recommended books.

### 8.22: Books by Genre with GraphQL
- Replace the client-side genre filtering implemented in exercise 8.20 with a GraphQL query-based solution.
- Extend the `allBooks` query to accept an optional `genre` argument.
- Update the frontend so that selecting a genre button sends a new GraphQL query to the server instead of filtering the existing data locally.
- Ensure the selected genre is passed as a query variable.
- The `Books` view should:
  - Display books belonging only to the selected genre.
  - Update the displayed list whenever a different genre is selected.

### 8.23: Up-to-Date Cache and Book Recommendations
- Ensure that the `Books` view remains up to date after adding a new book.
- Update the Apollo Client cache or use an appropriate refetch mechanism so that:
  - When a new book is added, the book list updates when a genre selection button is pressed.
  - The selected genre view fetches the latest book data from the backend.
- When no new genre selection is made, the view does not need to update.
- Ensure that the recommendation view continues to display correct books based on the logged-in user's favorite genre.

### 8.24: Checkup
- Run automated frontend tests to verify that the application works correctly with the backend.

#### Running Tests Locally
- Navigate to the `tests-chapter5` directory.
- Install test dependencies:

```bash
npm install && npx playwright install chromium
```

- Run the test suite and verify that all frontend tests pass successfully.:

```bash
npm test
```

#### Running Tests in GitHub Actions
- Enable the GitHub Actions workflow by uncommenting the workflow trigger configuration in `.github/workflows/test-chapter5.yml`:

```yaml
on:
  push:
    branches: [main, master]
  workflow_dispatch:
```

- Push the changes to GitHub and verify that the test workflow is completed successfully and all tests passed in GitHub Actions.

### 8.25: Subscriptions - Server
- Implement a GraphQL subscription in the backend called `bookAdded` for notifying clients whenever a new book is added.
- Extend the GraphQL schema with a `Subscription` type:

```graphql
type Subscription {
  bookAdded: Book!
}
```

- Replace Apollo Server's `startStandaloneServer` setup with an Express-based server using `expressMiddleware`.
- Configure an `HTTP` server and a `WebSocket` server so that:
  - Queries and mutations continue to use HTTP.
  - Subscriptions use WebSockets.
- Create a `PubSub` instance using `graphql-subscriptions`.
- Add a `bookAdded` subscription resolver that subscribes clients to a `BOOK_ADDED` event:

```js
Subscription: {
  bookAdded: {
    subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
  },
},
```

- Modify the `addBook` mutation so that after successfully saving a new book, it publishes the book to all subscribers:

```js
pubsub.publish('BOOK_ADDED', { bookAdded: book })
```

- Ensure the published book contains the populated `author` field so that subscribers receive the complete `Book` object.

### 8.26: Subscriptions - Client, part 1
- Configure Apollo Client to support both HTTP requests and WebSocket subscriptions.
- Add the `BOOK_ADDED` subscription to `queries.js`:

```graphql
subscription {
  bookAdded {
    title
    published
    genres
    id
    author {
      name
    }
  }
}
```

- Use Apollo Client's `useSubscription` hook in the application.
- When a new book is received from the server, notify the user:

```js
useSubscription(BOOK_ADDED, {
  onData: ({ data }) => {
    const addedBook = data.data.bookAdded
    notify(`${addedBook.title} added`)
  },
})
```

- The notification is displayed using the existing notification mechanism.

### 8.27: Subscriptions - Client, part 2
- Extend the `bookAdded` subscription so that the Apollo Client cache is updated whenever a new book is received from the server.
- Create a helper function for safely adding a book to the cached `ALL_BOOKS` queries.
- Before adding the book, check whether it is already present in the cache to prevent duplicate entries.
- Update the cache for:
  - The unfiltered `ALL_BOOKS` query.
  - The `ALL_BOOKS` query with `genre: null`.
  - Each genre contained in the newly added book.
- Use the same cache update helper both:
  - After a book is added locally through the `addBook` mutation.
  - When a new book is received through the `bookAdded` subscription.
- This prevents duplicate books when a book added through the application is received both from the mutation response and the subscription.
- The subscription therefore keeps the `Books` view synchronized across multiple browser tabs.
- Verify the implementation by:
  1. Opening the application in two browser tabs.
  2. Logging in where necessary.
  3. Adding a book in one tab.
  4. Confirming that the new book appears in the `Books` view of both tabs.

### 8.28: n+1
- Solve the n+1 database query problem caused by the `bookCount` field of each author.
- The original implementation calculated `bookCount` separately for every author:

```js
Author: {
  bookCount: async (root) => {
    return Book.countDocuments({
      author: root._id,
    })
  },
},
```

- For a query such as:

```graphql
query {
  allAuthors {
    name
    bookCount
  }
}
```

- this results in:
  - One database query to retrieve all authors.
  - One additional `Book.countDocuments()` query for every author.
- Replace the per-author count queries with a single aggregation query that calculates the number of books belonging to each author.
- This removes the n+1 query pattern for the `allAuthors` query by calculating the book counts as part of the main database operation.