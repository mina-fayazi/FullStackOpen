# Part 5 - Full Stack Open

This directory contains the exercises for Part 5 of the FullStackOpen course.

## Exercises

### 5.1: Blog List Frontend, step 1
- Implement login functionality:
  - Upon successful login, save the returned token to the application's state.
  - If no user is logged in, only the login form should be visible.
  - Once logged in, display the user’s name and a list of blogs.
- The user details are not yet stored in local storage.

### 5.2: Blog List Frontend, step 2
- Make the login persistent by storing user details in the browser’s local storage.
- Ensure the stored token is used when making requests after a page refresh.
- Implement a logout feature:
  - Remove the user details from local storage upon logout.
  - Ensure the browser does not retain login details after logging out.

### 5.3: Blog List Frontend, step 3
- Expand the application to allow a logged-in user to add new blogs.
- Implement a form where the user can enter the title, author, and URL of a new blog.
- Upon successful submission:
  - The blog is added to the list.
  - The input fields are cleared.
- Ensure that only logged-in users can see and use the blog creation form.

### 5.4: Blog List Frontend, step 4
- Implement a notification system to inform users about successful and unsuccessful operations.
- Notifications should:
  - Appear at the top of the page.
  - Display messages for a few seconds before disappearing.
- Examples of notifications:
  - **Success:** "Blog *Title* by *Author* added!"
  - **Error:** "Failed to add blog" or "Wrong username or password"
- Color coding for the notifications are:
  - **Green** for success messages.
  - **Red** for error messages.

### 5.5: Blog List Frontend, step 5
- Modify the blog creation form visibility. Use the `Togglable` component to toggle its visibility:
  - By default, the form is not visible.
  - Clicking the `New Blog` button expands the form.
  - After successfully creating a blog, the form hides automatically.

### 5.6: Blog List Frontend, step 6
- Refactor the blog creation form into its own component (`BlogForm`).
- Move all related states and handlers inside the `BlogForm` component.
- Ensure the component:
  - Uses `useState` for input fields.
  - Calls a function passed via props to handle blog creation.
- Maintain the toggle visibility functionality using the `Togglable` component.

### 5.7: Blog List Frontend, step 7
- Add a toggle button to each blog post that controls the visibility of its details, the URL and the number of likes with a `Like` button.
- At this stage, the like button does not need to function.
- Use inline styles to improve the appearance of the blogs.
- Since this functionality differs slightly from the `Togglable` component, implement a separate state inside the `Blog` component to track visibility.

### 5.8: Blog List Frontend, step 8
- Implement the `Like` button functionality:
  - Clicking the like button should increase the number of likes.
  - Send an HTTP `PUT` request to update the blog in the backend.
  - The request should include all blog fields, with the likes count incremented.
- Ensure the backend correctly handles the user reference when updating likes.

### 5.9: Blog List Frontend, step 9
- When a blog is liked, the name of the user who created the blog disappears but reappears after a browser refresh.
- Identify and fix the issue where user information does not display correctly after liking a blog by ensuring:
  - The entire blog object is correctly updated in the frontend.
  - The blog includes the user data when updating likes.

### 5.10: Blog List Frontend, step 10
- Modify the application to sort blogs by the number of likes in descending order.
- Use the array `.sort()` method to achieve this.
- Ensure the sorting updates dynamically when likes change.

### 5.11: Blog List Frontend, step 11
- Implement blog deletion functionality:
  - Add a delete button for each blog.
  - Clicking the button should remove the blog from the backend and update the UI.
  - Use `window.confirm()` to ask for confirmation before deleting.
- Ensure that only the user who created the blog sees the delete button.
- After deletion, update the blog list to reflect changes without requiring a page refresh.

### 5.12: Blog List Frontend, step 12
- Define `PropTypes` for the `Togglable` and `LoginForm` components:
  - PropTypes ensure that the correct data types are being passed to the components, which can help prevent bugs and improve the maintainability of the code.
  - This is particularly useful when the components rely on specific data types to function correctly.
- Add `ESLint` to the project and fix all of the linter errors:
  - Vite has already installed ESLint by default, so the next task is to define the desired configuration in the `.eslintrc.cjs` file.
  - Once ESLint configuration is added, run this command to detect and fix any issues in the code:  
  	  ```bash
	  npm run lint:fix
	  ```

### 5.13: Blog List Tests, step 1
- Write a test for the `Blog` component in the `bloglist-frontend/src/components/Blog.test.jsx` file to ensure that only the blog's `title` and `author` are displayed by default, while the `url` and `likes` remain hidden.
- Use CSS classes to distinguish between the summary and detailed views of the blog:
  - The default visible content (title and author) is wrapped in a `.blog-summary` class.
  - The hidden content (URL and likes) that is shown only when toggled is wrapped in a `.blog-details` class.
- The test verifies:
  - The presence of the title and author in the rendered output.
  - The absence of URL and likes in the DOM before interaction.
- Run the tests using the following command:
  ```bash
  npm test
  ```

### 5.14: Blog List Tests, step 2
- Extend the test for the `Blog` component to verify that the blog's URL and number of likes are shown after the user clicks the button that reveals additional details (e.g., the `View` button).
- The test simulates a user clicking the `View` button and asserts that:
  - The blog's `url` is displayed in the DOM.
  - The number of `likes` is shown correctly.

### 5.15: Blog List Tests, step 3
- Add a test that ensures clicking the blog's `Like` button twice calls the event handler twice.
- Use a mock function for the `updateBlog` handler prop to monitor how many times it's called.
- Simulate a user:
  - Clicking the `View` button to reveal the `Like` button.
  - Clicking the `Like` button two times.
- The test asserts that the mock function is called exactly two times.

### 5.16: Blog List Tests, step 4
- Write a test for the `BlogForm` component to ensure that when a new blog is submitted, the form correctly calls the `createBlog` event handler prop with the expected data.
- Use placeholder texts to select input fields and simulate filling out the form.
- The test verifies:
  - The handler is called once upon submission.
  - The object passed to the handler matches the user input.

### 5.17: Blog List End To End Testing, step 1
- Initialize a new npm project for end-to-end testing using `Playwright` in the `bloglist-e2e` directory.
- Test the application to ensure the login form is shown by default when visiting the front page.
- The test verifies that the username input, password input, and login button are all visible to the user upon page load.

### 5.18: Blog List End To End Testing, step 2
- Add two separate tests:
  - One to verify successful login using correct credentials. The test checks for a confirmation message and ensures it is styled correctly.
  - Another to verify that login fails with incorrect credentials. It checks for an error message and ensures the message is correctly styled and that no success message appears.
- The database is reset before each test to ensure a clean state.
- A test user is created before each test to simulate real user interaction.

### 5.19: Blog List End To End Testing, step 3
- Add a test that verifies a logged-in user can create a new blog.
- The test should:
  - Log in to the application.
  - Fill out and submit the form for creating a blog.
  - Confirm that the newly created blog appears in the list of blogs.

### 5.20: Blog List End To End Testing, step 4
- Create a test to verify that a user can like a blog.
- The test should:
  - Ensure the user is logged in and a blog is already created.
  - Expand the blog details to reveal the "Like" button.
  - Click the "Like" button and verify that the like count increases by 1.

### 5.21: Blog List End To End Testing, step 5
- Add a test to ensure that the user who created a blog can delete it.
- The test should:
  - Log in as a user and create a blog.
  - Expand the blog details to reveal the "Delete" button.
  - Handle the browser's `window.confirm` dialog to confirm the deletion.
  - Verify that the blog is no longer visible in the list after deletion.

### 5.22: Blog List End To End Testing, step 6
- Add a test to ensure that only the user who created a blog can see its delete button.
- The test should:
  - Log in as the original user and create a blog.
  - Log out and register a new user.
  - Log in as the new user.
  - Expand the blog details and verify that the "Delete" button is not displayed.
