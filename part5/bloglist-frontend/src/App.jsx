import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  // On component mount, check if a user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Fetch blogs only after a user is logged in
  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        } catch (error) {
          setErrorMessage({ text: 'Failed to fetch blogs', type: 'error' })
          console.error('Error fetching blogs:', error)
        }
      }
      fetchBlogs()
    }
  }, [user])
  
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
	  
	  setErrorMessage({ text: 'Login successful!', type: 'success' })
	  setTimeout(() => setErrorMessage(null), 5000)
	} catch (exception) {
	  console.error("Login failed:", exception) // Debugging line
      setErrorMessage({ text: 'Wrong username or password', type: 'error' })
	  setTimeout(() => setErrorMessage(null), 5000)
	}
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  
  const loginForm = () => (
    <div>
	  <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
	</div>
  )

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
	  
	  <Notification message={errorMessage}/>
	  
	  {
		user === null ?
		loginForm() :
		<div>
			<p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
			{blogForm()}
		</div>
    }
	  
    </div>
  )
}

export default App