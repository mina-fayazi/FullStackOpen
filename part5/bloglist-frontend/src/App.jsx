import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // State management
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: '' })
  
  /**
   * Displays a notification with a given message and type.
   * Default type is 'success'.
   * Notification disappears after 5 seconds.
   */
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, 5000)
  }
  
  /**
   * Checks if a user is already logged in when the component mounts.
   * If a user is found in local storage, it sets the user and token.
   */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Fetches all blogs from the server once the user is logged in.
  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        } catch (error) {
          //console.error('Error fetching blogs:', error) // Debugging line
		  showNotification('Failed to fetch blogs', 'error')
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
	  
	  setUser(user)
	  setUsername('')
	  setPassword('')
	  
	  showNotification('Login successful!')
	} catch (error) {
	  //console.error("Login failed:", error) // Debugging line
      showNotification('Wrong username or password', 'error')
	}
  }
  
  // Logs out the user by removing stored credentials and clearing state.
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  
  /**
   * Handles blog creation by sending the new blog data to the server.
   * If successful, updates the blog list and shows a success message.
   */
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setNewBlog({ title: '', author: '', url: '' })
	  showNotification(`Blog "${createdBlog.title}" by ${createdBlog.author} added!`)
    } catch (error) {
      //console.error('Error creating blog:', error) // Debugging line
	  showNotification('Failed to create blog', 'error')
    }
  }
  
  // Renders the login form.
  const loginForm = () => (
    <div>
	  <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
	</div>
  )
  
  // Renders the blog creation form.
  const blogCreate = () => (
    <div>
	  <h2>Create a new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title: <input type="text" value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
        </div>
        <div>
          Author: <input type="text" value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
        </div>
        <div>
          URL: <input type="text" value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
        </div>
        <button type="submit">Create</button>
      </form>
	</div>
  )
  
  // Renders the list of blogs.
  const blogForm = () => (
    <div>
	  {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
	</div>
  )

  return (
    <div>
      <h2>Blogs</h2>
	  
	  <Notification message={notification.message} type={notification.type} />
	  
	  {
		user === null ?
		loginForm() :
		<div>
			<p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
			{blogCreate()}
			{blogForm()}
		</div>
    }
	  
    </div>
  )
}

export default App