import { useState, useEffect, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

// Uncomment to use Redux for state management:
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  createBlog,
  updateBlogLikes,
  removeBlog,
} from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { showNotification } from './reducers/notificationReducer'

// Uncomment to use React Query and Context for state management:
/*
import {
  useNotificationValue,
  useNotificationDispatch,
} from './NotificationContext'
*/

const App = () => {
  // State management
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef() // Create a ref for Togglable

  /**
   * Displays a notification with a given message and type.
   * Default type is 'success'.
   * Notification disappears after 5 seconds by default.
   */

  // ___ Redux version ___
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const notify = (msg, type) => {
    dispatch(showNotification(msg, type))
  }

  // ___ React Query and Context version ___
  /*
  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()
  const notify = (msg, type = 'success', duration = 5) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { message: msg, type },
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, duration * 1000)
  }
  */

  /**
   * Checks if a user is already logged in when the component mounts.
   * If a user is found in local storage, it sets the user and token.
   */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const decodedToken = jwtDecode(user.token) // Decode the token

      // Check if token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        //console.log("Token expired, logging out") // Debugging line
        notify('Token expired, logging out', 'error')
        handleLogout() // Log out the user if token has expired
      } else {
        // ___ Redux version ___
        dispatch(setUser(user))

        blogService.setToken(user.token)
      }
    }
  }, [])

  // Fetches all blogs from the server once the user is logged in.
  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          // ___ Redux version ___
          await dispatch(initializeBlogs())
        } catch (error) {
          //console.error('Error fetching blogs:', error) // Debugging line
          notify('Failed to fetch blogs', 'error')
        }
      }
      fetchBlogs()
    }
  }, [user])

  /**
   * Handles user login by sending credentials to the server.
   * If successful, stores the user data and token, and displays a success message.
   */
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      // Store token in local storage
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token) // Ensure blogService uses this token

      // ___ Redux version ___
      dispatch(setUser(user))

      setUsername('')
      setPassword('')

      notify('Login successful!')
    } catch (error) {
      //console.error("Login failed:", error) // Debugging line
      notify('Wrong username or password', 'error')
    }
  }

  // Logs out the user by removing stored credentials and clearing state.
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')

    // ___ Redux version ___
    dispatch(clearUser())
  }

  /**
   * Handles blog creation by sending the new blog data to the server.
   * If successful, updates the blog list and shows a success message.
   */
  const createNewBlog = async (blogData) => {
    try {
      // ___ Redux version ___
      const createdBlog = await dispatch(createBlog(blogData))

      notify(`Blog "${createdBlog.title}" by ${createdBlog.author} added!`)

      // Hide the form after creating the blog
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      //console.error('Error creating blog:', error) // Debugging line
      notify('Failed to create blog', 'error')
    }
  }

  // Updates a blog's likes in the backend and frontend state.
  const updateBlog = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)

      // ___ Redux version ___
      dispatch(updateBlogLikes(returnedBlog))

      notify(
        `Liked: ${returnedBlog.title} by ${returnedBlog.author}`,
        'success'
      )
    } catch (error) {
      notify('Error updating blog likes', 'error')
    }
  }

  // Deletes a blog post in the frontend.
  const deleteBlog = async (id, title, author) => {
    if (window.confirm(`Remove blog "${title}" by ${author}?`)) {
      try {
        await blogService.remove(id)

        // ___ Redux version ___
        dispatch(removeBlog(id))

        notify(`Deleted blog "${title}" by ${author}`)
      } catch (error) {
        notify('Error deleting blog', 'error')
      }
    }
  }

  // Renders the blog creation form.
  const blogCreate = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={createNewBlog} />
    </Togglable>
  )

  // Renders the list of blogs.
  const blogList = () => (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes) // Sort blogs by likes in descending order
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
            showNotification={notify}
          />
        ))}
    </div>
  )

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={notification.message} type={notification.type} />

      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>
          {blogCreate()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
