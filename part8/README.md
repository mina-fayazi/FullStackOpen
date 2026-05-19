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
