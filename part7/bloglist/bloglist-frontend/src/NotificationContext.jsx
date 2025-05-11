import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, type: action.payload.type }
    case 'CLEAR_NOTIFICATION':
      return { message: '', type: '' }
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    message: '',
    type: '',
  })

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext)
  return dispatch
}

export default NotificationContext
