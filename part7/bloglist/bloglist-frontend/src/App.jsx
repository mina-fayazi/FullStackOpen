import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import Navigation from './components/Navigation'

// Uncomment to use Redux for state management:
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog as deleteBlogThunk,
} from './reducers/blogReducer'
import {
  restoreUserFromLocalStorage,
  login,
  logout,
  setUsername,
  setPassword,
} from './reducers/userReducer'
import { showNotification } from './reducers/notificationReducer'
//////////

// Uncomment to use React Query and Context for state management:
/*
import {
  useNotificationValue,
  useNotification,
} from './contexts/NotificationContext'
import {
  useUserValue,
  useUserDispatch,
  useSetUser,
  useClearUser,
  useLogin,
  useLogout,
} from './contexts/UserContext'
import {
  useBlogValue,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
} from './contexts/BlogContext'
*/
//////////

const App = () => {
  // ___Redux State Management___
  // Uncomment to use Redux:
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const userState = useSelector((state) => state.user)
  const { user, username, password } = userState
  const notification = useSelector((state) => state.notification)
  //////////

  // ___React Query and Context State Management___
  // Uncomment to use React Query and Context:
  /*
  const notification = useNotificationValue()
  const showNotification = useNotification()

  const userState = useUserValue()
  const userDispatch = useUserDispatch()
  const { user, username, password } = userState
  const setUser = useSetUser()
  const clearUser = useClearUser()
  const loginMutation = useLogin(showNotification)
  const logout = useLogout()

  const blogsQuery = useBlogValue()
  const blogs = blogsQuery?.data || []
  const createBlogMutation = useCreateBlog(showNotification)
  const updateBlogMutation = useUpdateBlog(showNotification)
  const deleteBlogMutation = useDeleteBlog(showNotification)
  */
  //////////

  const blogFormRef = useRef() // Create a ref for Togglable

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

        // ___Redux version___
        dispatch(logout())

        // ___React Query and Context version___
        //clearUser()
      } else {
        // ___Redux version___
        dispatch(restoreUserFromLocalStorage(user))

        // ___React Query and Context version___
        //setUser(user)
      }
    }
  }, [])

  /**
   * Handles user login by sending credentials to the server.
   * If successful, stores the user data and token, and displays a success message.
   */
  const handleLogin = (event) => {
    event.preventDefault()
    // ___Redux version___
    dispatch(login())

    // ___React Query and Context version___
    //loginMutation.mutate({ username, password })
  }

  // Logs out the user by removing stored credentials and clearing state.
  /*
  const handleLogout = () => {
    // ___Redux version___
    dispatch(logout())

    // ___React Query and Context version___
    //logout()
  }
  */

  // Fetches all blogs from the server once the user is logged in.
  // This part should only be uncommented when using Redux for state management
  // ___Redux version___
  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [user])
  //////////

  /**
   * Handles blog creation by sending the new blog data to the server.
   * If successful, updates the blog list and shows a success message.
   */
  const createNewBlog = (blogData) => {
    // ___Redux version ___
    dispatch(createBlog(blogData))

    // ___React Query and Context version___
    //createBlogMutation.mutate(blogData)

    // Hide the form after creating the blog
    blogFormRef.current.toggleVisibility()
  }

  // Updates a blog's likes in the backend and frontend state.
  const updateBlog = (updatedBlog) => {
    // ___Redux version___
    dispatch(likeBlog(updatedBlog))

    // ___React Query and Context version___
    //updateBlogMutation.mutate(updatedBlog)
  }

  // Deletes a blog post in the frontend.
  const deleteBlog = async (id, title, author) => {
    if (window.confirm(`Remove blog "${title}" by ${author}?`)) {
      // ___Redux version___
      dispatch(deleteBlogThunk(id, title, author))

      // ___React Query and Context version___
      //deleteBlogMutation.mutate({ id, title, author })
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
    <BlogList blogs={blogs.slice().sort((a, b) => b.likes - a.likes)} />
  )

  return (
    <Router>
      <div className='container'>
        {user && <Navigation />} {/* Show nav only if user is logged in */}
        <Notification message={notification.message} type={notification.type} />
        {user === null ? (
          <LoginForm
            handleSubmit={handleLogin}
            // ___Redux version___
            handleUsernameChange={({ target }) =>
              dispatch(setUsername(target.value))
            }
            // ___React Query and Context version___
            /*
            handleUsernameChange={({ target }) =>
              userDispatch({ type: 'SET_USERNAME', payload: target.value })
            }
	  	  */

            // ___Redux version___
            handlePasswordChange={({ target }) =>
              dispatch(setPassword(target.value))
            }
            // ___React Query and Context version___
            /*
            handlePasswordChange={({ target }) =>
              userDispatch({ type: 'SET_PASSWORD', payload: target.value })
            }
	  	  */

            username={username}
            password={password}
          />
        ) : (
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <div
                    style={{
                      margin: '20px',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}>
                    {blogCreate()}
                  </div>
                  <div>{blogList()}</div>
                </>
              }
            />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<User />} />
            <Route
              path='/blogs/:id'
              element={<Blog updateBlog={updateBlog} deleteBlog={deleteBlog} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App
