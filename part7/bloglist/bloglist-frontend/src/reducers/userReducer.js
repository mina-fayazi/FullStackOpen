import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    username: '',
    password: '',
  },
  reducers: {
    setUser(state, action) {
      return { ...state, user: action.payload }
    },
    clearUser() {
      return { user: null, username: '', password: '' }
    },
    setUsername(state, action) {
      return { ...state, username: action.payload }
    },
    setPassword(state, action) {
      return { ...state, password: action.payload }
    },
  },
})

export const { setUser, clearUser, setUsername, setPassword } =
  userSlice.actions

export const login = () => {
  return async (dispatch, getState) => {
    const { username, password } = getState().user
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(showNotification('Login successful!'))
    } catch (error) {
      dispatch(showNotification('Wrong username or password', 'error'))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(clearUser())
  }
}

export default userSlice.reducer
