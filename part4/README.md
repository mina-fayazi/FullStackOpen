# Part 4 - Full Stack Open

This directory contains the exercises for Part 4 of the FullStackOpen course.

## Exercises

### 4.1: Blog List, step 1
- Develop a `Node.js` application using `Express` for managing a blog list.
- Configure the application to connect to a `MongoDB` database using environment variables.
- Set up the development environment with `nodemon` for automatic server restarts.
- Implement and test the following routes:
  - `GET` request at `/api/blogs` to retrieve all blog entries from the database.
  - `POST` request at `/api/blogs` to add a new blog entry with fields: `title`, `author`, `url`, and `likes`.

### 4.2: Blog List, step 2
- Refactor the application into modular components for better code organization and scalability:
  - **utils/logger.js**: Prints normal log messages and errors.
  - **utils/config.js**: Handles environment variables for database connections.
  - **models/blog.js**: Defines the Mongoose schema and model for blog entries.
  - **controllers/blogs.js**: Manages the route handlers for blog operations.
  - **app.js**: Set up middleware and connected route handlers.
  - **index.js**: Configures server startup.
