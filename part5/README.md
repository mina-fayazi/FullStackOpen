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
- Since this functionality differs slightly from the `Togglable` component, implement a separate state inside the Blog component to track visibility.
