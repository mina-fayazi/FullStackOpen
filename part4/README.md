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

### 4.8: Blog List Tests, step 1
- Set up a test environment:
  - Configure a separate database for running tests.
- Install and configure `SuperTest` to perform integration testing on the API in the `tests/blog_api.test.js` file:
  - Make an HTTP `GET` request to the `/api/blogs` endpoint.
  - Verify that the response contains the correct number of blog posts in JSON format.
  - Run the tests using the command:
	  ```bash
	  npm test -- tests/blog_api.test.js
	  ```
- Create a test helper module (`tests/test_helper.js`) to assist with setting up and tearing down test data:
  - Define an array of `initialBlogs` to populate the database before tests.
  - Implement a `blogsInDb` function to fetch all blogs from the database.
  - Implement a `nonExistingId` function to generate a valid but non-existing blog ID for testing deletions.
- Refactor route handler to use `async/await`.

### 4.9: Blog List Tests, step 2
- Write a test to verify that the unique identifier property of blog posts is named `id`. By default, MongoDB uses `_id` as the identifier.

### 4.10: Blog List Tests, step 3
- Write a test to verify the HTTP `POST` request to the `/api/blogs` endpoint for creating a new blog post.
- After the request is made, verify that the response has a status code of `201 Created`.
- Check that the total number of blogs in the system has increased by one compared to the previous count.
- Verify that the new blog post's title matches the data sent in the request.

### 4.11\*: Blog List Tests, step 4
- Update the blog model schema to include a default value of `0` for the `likes` property.
- Create a test to send a blog post request without the `likes` field.  
- Validate that the response status code is correct and the blog is added successfully.  
- Retrieve all blogs from the database and check that the `likes` field is set to `0`.  

### 4.12\*: Blog List Tests, step 5
- Add the `express-async-errors` package to simplify asynchronous error handling and eliminate the need for explicit `try-catch` blocks in route handlers.
- Modify the blog schema to require `title` and `url` fields.
- Write tests to send blog post requests missing the `title` and `url` fields separately.
- Verify that the response contains an error message indicating the missing fields.
- Ensure that no blog is added to the database when the request is invalid.

### 4.13: Blog List Expansions, step 1
- Implement the functionality to delete a single blog post using the `DELETE` HTTP method.
- Follow RESTful conventions by implementing the `/api/blogs/:id` endpoint, where `:id` is the unique identifier of the blog post to be deleted.
- Use the async/await syntax to handle asynchronous operations.
- If the blog post is found and deleted successfully, return a status code of `204 No Content` indicating the deletion was successful.
- If the blog post is not found, return a status code of `404 Not Found` along with an error message indicating that the blog post does not exist.
- Write tests for the `DELETE` request to ensure:
  - A blog post is successfully deleted when it exists.
  - A `404 Not Found` response is returned when attempting to delete a non-existent blog post.
  - The total number of blogs in the database decreases by one after a successful delete operation.

### 4.14: Blog List Expansions, step 2
- Implement the functionality to update the information of a blog post using the `PUT` HTTP method.
- Implement the `/api/blogs/:id` endpoint, where `:id` is the unique identifier of the blog post to be updated.
- The application primarily needs to update the `likes` property of a blog post.
- If the blog post is found, update the `likes` field with the new value and return the updated blog post as the response with a status code of `200 OK`.
- If the blog post is not found, return a `404 Not Found` response with an appropriate error message.
- Write tests for the `PUT` request to ensure:
  - A blog post's `likes` field is successfully updated when the blog post exists.
  - A `404 Not Found` response is returned if the blog post does not exist.
  - The updated `likes` value is correctly saved in the database.

### 4.15: Blog List Expansions, step 3  
- Implement the functionality to create new users using the `POST` HTTP method at the `/api/users` endpoint.  
- Each user has the following fields:  
  - `username` (required, unique)  
  - `password` (required, must meet security requirements)  
  - `name` (optional)  
- Passwords must not be stored in plain text. Use the `bcrypt` library to hash passwords before saving them to the database.

### 4.16\*: Blog List Expansions, step 4  
- Add restrictions to user creation:  
  - Both `username` and `password` must be provided.
  - Both fields must be at least 3 characters long.
  - The `username` must be unique.
- If an invalid user is created, return a suitable status code (`400 Bad Request`) and an appropriate error message. 
- Implement tests to verify: 
  - A request with a username or password shorter than 3 characters results in a `400 Bad Request` response with an appropriate error message.  
  - A request with a missing username or password results in a `400 Bad Request` response with an appropriate error message.  
  - A request attempting to create a duplicate username results in a `400 Bad Request` response with an appropriate error message.
  - The number of users in the database remains unchanged after a failed user creation attempt.
- Run the tests using the command:
	  ```bash
	  npm test -- tests/user_api.test.js
	  ```