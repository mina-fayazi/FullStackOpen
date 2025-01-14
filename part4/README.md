# Part 4 - Full Stack Open

This directory contains the exercises for Part 4 of the FullStackOpen course.

## Exercises

### 4.1: Blog List, step 1
- Develop a `Node.js` application using `Express` for managing a blog list in the `part4/bloglist-backend` directory.
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
  - **app.js**: Sets up middleware and connected route handlers.
  - **index.js**: Configures server startup.

### 4.3: Helper Functions and Unit Tests, step 1
- Create a `utils/list_helper.js` file to contain helper functions for blog data processing.
- Implement a `dummy` function that takes an array of blog posts and always returns `1`.  
- Verify test configuration in the `tests/list_helper.test.js` file with a unit test that checks if `dummy` returns `1`.

### 4.4: Helper Functions and Unit Tests, step 2
- Add a `totalLikes` function in `list_helper.js` to calculate the total number of likes across all blog posts.  
- Write unit tests in `list_helper.test.js` to verify:
  - For an empty list, `totalLikes` returns `0`.
  - For a single blog post, `totalLikes` returns the correct like count.
  - For multiple blog posts, `totalLikes` correctly sums up the likes.

### 4.5\*: Helper Functions and Unit Tests, step 3
- Implement the `favoriteBlog` function to identify the blog post with the highest number of likes. The function returns an object with the blog's `title`, `author`, and `likes`.  
- Write unit tests to validate the correct blog is returned for:
  - An empty blog list (returns `null`).
  - A single blog post.
  - A list of multiple blog posts.

### 4.6\*: Helper Functions and Unit Tests, step 4
- Create the `mostBlogs` function to find the author with the most blog posts. It returns an object with the author's name and their total number of blogs.  
- Write unit tests to check if:
  - The function handles an empty list by returning `null`.
  - The author of a single blog is returned when there is only one entry.
  - The correct author is returned for multiple blog entries. If there are multiple top bloggers, any one of them can be returned.

### 4.7\*: Helper Functions and Unit Tests, step 5
- Develop the `mostLikes` function to determine the author whose blog posts have the highest combined likes. It returns an object with the author's name and their total likes.  
- Write unit tests to ensure:
  - The function handles an empty list by returning `null`.
  - The author of a single blog is returned when there is only one entry.
  - The correct author is identified in a list of blog posts. If there are multiple top bloggers, any one of them can be returned.
