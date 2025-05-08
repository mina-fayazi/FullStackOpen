# Part 7 - Full Stack Open

This directory contains the exercises for Part 7 of the FullStackOpen course.

## Exercises

### 7.1: Routed Anecdotes, step 1
- Add routing capabilities using `React Router`.
- Implement the `Menu` component to allow navigation between different views:
  - The homepage (`/`) displays a list of anecdotes.
  - The `Create` form is shown on the `/create` path.
  - The `About` page is accessible via `/about`.
- Ensure that the `Footer` component is always visible regardless of the current route.

### 7.2: Routed Anecdotes, step 2
- Implement a dynamic route for displaying a single anecdote.
- When clicking on an anecdote's name in the list, the app should navigate to the anecdote's dedicated page:
  - URL pattern: `/anecdotes/:id`
  - The view should display full details of the selected anecdote.

### 7.3: Routed Anecdotes, step 3
- Improve the anecdote creation user experience.
- After a new anecdote is created:
  - Automatically navigate the user back to the homepage (`/`).
  - Display a notification with a message such as:
    `A new anecdote 'X' created!`
  - The notification should disappear automatically after 5 seconds.
