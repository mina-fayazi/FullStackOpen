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
