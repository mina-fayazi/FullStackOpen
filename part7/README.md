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

### 7.7: Country Hook
- Implement a custom hook called `useCountry` that fetches data about a country using its name.
- The hook should accept a country name as its parameter and return the country’s data.
- Use the REST API available at `https://studies.cs.helsinki.fi/restcountries/api/name/{country}` to fetch country details.
- Integrate the hook with a `useEffect` so that it triggers a new fetch request only when the given country name changes.
- If the country is found, display its name, capital, population, and flag image.
- If the country is not found, show a message saying "not found...".

### 7.8: Ultimate Hooks
- Create a custom hook called `useResource` for managing HTTP communication with a backend service.
- The hook should be reusable for different types of resources (e.g., notes, persons).
- `useResource` should return two values: the current list of resources, and an object containing methods to manipulate the resources (e.g., `create`).
- Implement `getAll` and `create` functionalities in the hook. Other actions like `update` and `delete` are not required.
- Use this hook in the `App` component to fetch and display both notes and persons.
- When the form is submitted, use the corresponding service returned by the hook to create a new note or person.
- The hook should update the local state automatically after a new resource is created, so the UI reflects the latest data.
- This setup enables clean and reusable logic for managing resources, promoting separation of concerns and modularity.
