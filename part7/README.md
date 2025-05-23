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

### 7.9: Extending the Bloglist: Automatic Code Formatting
- Introduce `Prettier` as a tool to enforce consistent code formatting across the project.
- Prettier is configured in the development environment and integrated with the code editor to automatically format the code.

### 7.10: Extending the Bloglist: State Management – Notifications

#### Option 1: Redux, step 1
- Refactor the application to use Redux for managing the notification state. The Redux setup includes:
  - Create a Redux store using `@reduxjs/toolkit` in `src/store.js`.
  - Define a notification slice in `src/reducers/notificationReducer.js` that includes:
    - The initial state for notifications.
    - Reducers for setting and clearing notification messages.
  - Create action creators (e.g., `setNotification` and `clearNotification`) to manage notification content and type.
  - Connect the Redux store to the application using the `<Provider>` component.
  - Use the `useDispatch` and `useSelector` hooks to update and access notification state within components.
  - Handle automatic clearing of notifications after a delay (e.g., `setTimeout`).

#### Option 2: React Query and Context, step 1
- Manage the notification state using React Context and the `useReducer` hook:
  - Create a custom context in `src/contexts/NotificationContext.jsx` using `@tanstack/react-query` to store and dispatch notification state.
  - A provider component (`NotificationContextProvider`) wraps the application to make the context accessible throughout the component tree.
  - Custom hooks (`useNotificationValue` and `useNotificationDispatch`) abstract access to the notification state and dispatch function.
  - Notifications are triggered by dispatching actions to the context, and optionally cleared after a timeout.

### 7.11: Extending the Bloglist: State Management - Fetching and Creating Blogs

#### Option 1: Redux, step 2
- Extend the Redux setup to include the state management of blog posts:
  - Create a blog slice in `src/reducers/blogReducer.js` to handle the fetching, creation, and overall state of blog posts.
  - Use Redux to retrieve blogs from the backend and store them in the Redux store.
  - Update the application components to read blog data directly from the Redux store using `useSelector`.
  - Dispatch actions to fetch blogs during app initialization and to create new blogs upon form submission.
- For this step, it is acceptable to manage login and blog creation forms using local React component state.

#### Option 2: React Query and Context, step 2
- Use React Query to manage the state for blog posts:
  - Implement React Query hooks in `src/contexts/BlogContext.jsx` to fetch existing blog posts from the backend.
  - Use React Query’s mutation hooks to handle the creation of new blogs, ensuring that successful creations update the query cache accordingly.
  - The UI should display the list of blogs and allow the addition of new blogs, reflecting changes immediately after successful mutations.

### 7.12: Extending the Bloglist: State Management - Liking and Deleting Blogs

#### Option 1: Redux, step 3
- Expand the Redux blog slice to support updating and deleting blog posts:
  - Implement Redux actions and reducers to handle liking a blog post and removing a blog from the backend.
  - Ensure the state in the Redux store is updated accordingly after each operation so that the UI reflects the changes in real time.
  - Use `useDispatch` in the relevant components to trigger like and delete actions.

#### Option 2: React Query and Context, step 3
- Expand your React Query solution to include liking and deleting blog posts:
  - Use React Query mutation hooks to implement the like and delete functionalities for blogs.
  - Ensure that after liking or deleting a blog, the React Query cache is invalidated or updated so the UI stays in sync with the backend.
  - The UI should allow users to like or delete blogs, reflecting the changes immediately based on query updates.

### 7.13: Extending the Bloglist: State Management - User Login

#### Option 1: Redux, step 4
- Store the authenticated user’s information in the Redux store to enable global access to user state:
  - Create a user slice in `src/reducers/userReducer.js` that includes:
    - Setting the signed-in user upon successful login.
    - Clearing the user data upon logout.
  - Update components that rely on authentication to use the Redux store for user-related logic.

#### Option 2: React Query and Context, step 4
- Use the `useReducer` hook and React Context to manage the logged-in user data:
  - Create a user context with `useReducer` in `src/contexts/UserContext.jsx` to handle user state, including login and logout actions.
  - Wrap the application in a user context provider to provide user state and dispatch functions throughout the component tree.
  - Update components to consume the user context for authentication status and user information.

### 7.14: Extending the Bloglist: Views - Users View
- Implement a new view that displays a table of all users in the application along with the number of blogs each user has created.
- This view is accessible via a navigation link titled "Users" in the main menu.
- The users are listed in a tabular format where each row includes:
  - The name of the user.
  - The number of blogs they have created.
- Each user's name acts as a clickable link that routes to a separate view displaying that user's blogs.
- This view uses the `react-router-dom` library for navigation and routing between pages.

### 7.15: Extending the Bloglist: Views - Individual User View
- Implement a view that displays detailed information about an individual user.
- When a user is selected from the users list (by clicking their name), this view shows:
  - The user's name.
  - A list of blog posts the user has added.
- This view is navigable via the user links in the Users view.
- To handle cases where data is not yet available (e.g., when refreshing the page), conditional rendering is applied to avoid accessing undefined properties.

### 7.16: Extending the Bloglist: Views - Blog View
- Implement a dedicated view for individual blog posts.
- This view should be accessible by clicking on a blog title in the list of blogs on the main page.
- When a blog is clicked, the application navigates to a route like `/blogs/:id`, where `:id` corresponds to the unique identifier of the blog.
- The individual blog view displays the following details:
  - The title of the blog post.
  - The author of the blog post.
  - The blog URL as a clickable link.
  - The number of likes the blog has received.
  - A button to increment the number of likes.
  - The name of the user who added the blog.
  - A delete button, visible only to the user who created the blog.
- The blog list view should now only display the blog titles as links. Expanding items is no longer necessary and should be removed.
- The application uses `react-router-dom` for navigation and routing between the blog list and individual blog views.

### 7.17: Extending the Bloglist: Views - Navigation
- Implement a navigation menu for the application that enhances usability and allows users to easily access different views.
- The navigation menu should:
  - Appear at the top of the page.
  - Be displayed only when a user is logged in.
- The menu includes the following items:
  - A link to the "Blogs" view.
  - A link to the "Users" view.
  - The name of the currently logged-in user.
  - A logout button that logs the user out of the application.
- Use `react-router-dom` for handling navigation between the views.
- Ensure that logging out hides the navigation menu and returns the user to the login form.

### 7.18: Extending the Bloglist: Views - Comments, step 1
- Extend the blog post view to include a list of comments associated with each blog.
- Comments should be displayed under a separate "Comments" section on the individual blog page.
- Each comment is presented as a simple list item.
- Comments are anonymous and are not associated with any specific user.
- In this step, it is only required to display the comments that are retrieved from the backend.
- An appropriate API endpoint for retrieving and adding comments is `/api/blogs/:id/comments`.

### 7.19: Extending the Bloglist: Views - Comments, step 2
- Add functionality to allow users to submit new comments to blog posts from the frontend.
- When the comment is submitted, it should be sent to the backend and added to the list of comments.
- Upon successful submission, the new comment should appear in the list without requiring a page reload.

### 7.20: Extending the Bloglist: Views - Styles, step 1
- Improve the appearance of the application by introducing styling.
  - Used the `react-bootstrap` library to apply consistent and modern UI components.

### 7.21: Extending the Bloglist: Views - Styles, step 2
- This exercise can be considered complete after spending at least one hour on styling the application.
  - Dedicated focused time (over three hours) to refine and enhance the styling of the application.
  - Polished layout details, spacing, responsiveness, and component alignment.
  - Ensured a visually cohesive experience across different views and screen sizes.
  - No additional functionality added; the work focused solely on UI/UX improvements.
