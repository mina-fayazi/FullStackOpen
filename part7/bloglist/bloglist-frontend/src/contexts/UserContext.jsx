import { createContext, useReducer, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'
import blogService from '../services/blogs'

const UserContext = createContext()

const initialState = {
  user: null,
  username: '',
  password: '',
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'CLEAR_USER':
      return { ...state, user: null, username: '', password: '' }
    case 'SET_USERNAME':
      return { ...state, username: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [state] = useContext(UserContext)
  return state
}

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext)
  return dispatch
}

// Custom login hooks:
export const useSetUser = () => {
  const dispatch = useUserDispatch()
  return (user) => {
    blogService.setToken(user.token)
    dispatch({ type: 'SET_USER', payload: user })
  }
}

export const useClearUser = () => {
  const dispatch = useUserDispatch()
  return () => {
    blogService.setToken(null)
    dispatch({ type: 'CLEAR_USER' })
  }
}

export const useLogin = (notify) => {
  const dispatch = useUserDispatch()

  return useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'SET_USER', payload: user })
      notify('Login successful!')
    },
    onError: () => {
      notify('Wrong username or password', 'error')
    },
  })
}

export const useLogout = () => {
  const dispatch = useUserDispatch()

  return () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch({ type: 'CLEAR_USER' })
  }
}

export default UserContext
