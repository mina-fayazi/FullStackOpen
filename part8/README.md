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
