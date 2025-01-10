# Part 3 - Full Stack Open

This directory contains the exercises for Part 3 of the FullStackOpen course.

## Exercises

### 3.1: Phonebook Backend, step 1
- Create a `Node.js` application to serve the phonebook data from the server.
- Define a route at `/api/persons` that returns the phonebook entries as a JSON response.
- Use `Express` to build the backend server.

### 3.2: Phonebook Backend, step 2
- Add a new route `/info` that responds with an informational message.
- The response includes:
  - The total number of entries in the phonebook.
  - The current date and time.

### 3.3: Phonebook Backend, step 3
- Implement functionality to fetch information for a single phonebook entry by its ID.
- Define a route at `/api/persons/:id` that:
  - Searches for the entry with the given ID.
  - Returns the matching entry as a JSON response if found.
  - Responds with a `404 Not Found` status and an appropriate error message if the entry does not exist.

### 3.4: Phonebook Backend, step 4
- Add functionality to delete a phonebook entry.
- Define a `DELETE` route at `/api/persons/:id` that:
  - Removes the entry with the specified ID from the phonebook.
  - Responds with a `204 No Content` status upon successful deletion.

### 3.5: Phonebook Backend, step 5
- Add functionality to add new entries to the phonebook.
- Define a `POST` route at `/api/persons` that:
  - Adds a new entry to the phonebook.
  - Ensures that the `name` and `number` fields are included in the request body.
  - Validates that the `name` field is unique, returning a `400 Bad Request` status and an error message if the name already exists.

### 3.6: Phonebook Backend, step 6
- Enhance the phonebook backend by implementing error handling for creating new entries. This ensures that invalid requests are properly managed, and users are informed of the errors with appropriate messages.

### 3.7: Phonebook Backend, step 7
- Add the `morgan` middleware for logging requests.
- Configure `morgan` to use the "tiny" format.

### 3.8\*: Phonebook Backend, step 8
- Extend `morgan` to log the data sent in HTTP POST requests.
- Note: Avoid logging sensitive data in production environments to comply with privacy regulations.

### 3.9: Phonebook Backend, step 9
- Integrate the backend with the phonebook frontend from Part 2.
- Serve the frontend's production build from the backend:
  - Place the frontend's production build files in the `part3/phonebook-backend/dist` directory.
  - Configure the backend to serve static files from this directory using `Express`.
  - Update the frontend to ensure its requests point to the correct backend URLs.
- Install and use `CORS` to enable cross-origin requests between the frontend and backend.
- Verify the integration:
  - Ensure that the phonebook frontend can fetch, add, and delete entries using the backend API.
  - Test all existing functionality in the frontend with the backend.

### 3.10: Phonebook Backend, step 10
- Deploy the backend to the internet using Render.
- Steps for deployment:
  1. Create a public repository for the backend in GitHub.
  2. Sign in to [Render](https://render.com) with your GitHub account.
  3. Create a new "Web Service" in Render and connect it to the backend repository.
  4. Define the build and start commands in Render:
     - Build Command: `npm install`
     - Start Command: `npm start`
  5. Ensure the backend application listens on the port specified by the `PORT` environment variable (default to `3001` if not set).
  6. Monitor the logs in Render to confirm the application has started successfully.
- Verify the deployed backend using:
  - A browser, by navigating to the deployed URL.
  - Tools like Postman or VS Code REST Client.
- The backend for this exercise is deployed at:  
  [Phonebook Backend on Render](https://phonebook-backend-gk9h.onrender.com/)

### 3.11: Full Stack Phonebook
- Integrate the frontend production build with the deployed backend.
- Redeploy the backend on Render with the integrated frontend.
- Verify that the frontend application works correctly:
  - Locally in development mode with `npm run dev`.
  - In production using the deployed URL.
- The deployed application can be accessed at:  
  [Phonebook Full Stack Application on Render](https://phonebook-backend-gk9h.onrender.com/)

### 3.12: Command-line Database
- Set up a cloud-based MongoDB database for the phonebook application using MongoDB Atlas.
- Create a `mongo.js` file in the backend project directory to manage phonebook entries directly from the command line.
- The script can either add a new entry or list all entries depending on whether `name` and `number` are provided:
1. **Add a New Entry**
     ```bash
     node mongo.js <username> <password> <name> <number>
     ```
2. **List All Entries**  
     ```bash
     node mongo.js <username> <password>
     ```

### 3.13: Phonebook Database, Step 1
- Refactor the backend to fetch phonebook entries from a MongoDB database instead of using a hardcoded array.
- Set up a `models/person.js` file to define the Mongoose schema and model for phonebook entries:
  - Each entry includes a `name` and `number` field.
- Modify the `/api/persons` route to retrieve data from the database using Mongoose.
- Verify that the frontend works as expected after the changes:
  - Ensure that the list of phonebook entries is fetched from the backend API and displayed correctly in the frontend.

### 3.14: Phonebook Database, Step 2
- Update the backend to save new phonebook entries to the database when they are added via the frontend.
- Modify the `POST /api/persons` route to:
  - Create and save a new person in the MongoDB database using Mongoose.
  - Validate that both the `name` and `number` fields are provided in the request body, returning a `400 Bad Request` error if either field is missing.
- Test the functionality to ensure the frontend can add new entries to the phonebook:
  - Verify that new entries appear in the frontend's list after being successfully added.
  - Confirm the data is saved correctly in the MongoDB database.

### 3.15: Phonebook Database, Step 3
- Enhance the backend to support the deletion of phonebook entries stored in the MongoDB database.

### 3.16: Phonebook Database, Step 4
- Refactor the backend to use a dedicated error handler middleware for managing errors.

### 3.17\*: Phonebook Database, Step 5
- Modify the backend to support updating the phone number of an existing entry when the user tries to add a person whose name is already in the phonebook. The frontend will send an HTTP `PUT` request to the unique URL of the existing entry to update its phone number.

### 3.18\*: Phonebook Database, Step 6
- Add the `GET /api/persons/:id` route to fetch a person's details directly from the MongoDB database.
- Implement the `/info` route to use the database for determining the total number of entries.

### 3.19\*: Phonebook Database, Step 7
- Expand the backend validation to ensure the `name` field in the database contains at least three characters.
- Modify the frontend to display error messages when validation fails.

### 3.20\*: Phonebook Database, Step 8
- Add validation to ensure phone numbers in the phonebook are in the correct format:
    - Have a length of 8 or more characters.
    - Be formed of two parts separated by a hyphen (`-`), where the first part has two or three digits and the second part consists of digits. For example:
        - Valid: `09-1234556`, `040-22334455`
        - Invalid: `1234556`, `1-22334455`, `10-22-334455`

### 3.21: Deploying the Database Backend to Production
- Deploy the latest version of the full stack phonebook application to Render by creating a new production build of the frontend and integrating it into the backend repository.
- The deployed application can be accessed at:  
  [Phonebook Full Stack Application on Render](https://phonebook-backend-gk9h.onrender.com/)