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
  - Display a notification with a message such as: `A new anecdote 'X' created!`
  - The notification should disappear automatically after 5 seconds.

### 7.4: Anecdotes and Hooks, step 1
- Simplify the anecdote creation form by utilizing a custom hook called `useField`.
- Define the `useField` hook in a separate file, preferably at `src/hooks/index.js`.
- The hook should manage the state and onChange handler for form fields.
- Refactor the anecdote creation form to use this hook instead of manually handling state for each input field.

### 7.5: Anecdotes and Hooks, step 2
- Extend the `useField` custom hook to include a `reset` function that clears the input value.
- Add a "Reset" button next to the "Create" button in the form.
- When the reset button is clicked, all fields in the form should be cleared using the `reset` method provided by the hook.

### 7.6: Anecdotes and Hooks, step 3
- If the reset implementation causes a warning like: `Invalid value for prop 'reset' on <input> tag`, resolve it.
- Avoid passing the `reset` function as a prop to the `<input>` element.
- Refactor the hook or how it is used so that `reset` is excluded from the props passed to the input field via the spread syntax.
- The solution should preserve the convenience of using the spread operator for cleaner code while avoiding invalid HTML attributes.
