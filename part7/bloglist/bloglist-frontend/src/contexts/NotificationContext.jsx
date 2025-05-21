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

  const notify = (msg, type = 'success', duration = 5) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message: msg, type },
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, duration * 1000)
  }

  return (
    <NotificationContext.Provider value={[notification, notify]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotification = () => {
  const [, notify] = useContext(NotificationContext)
  return notify
}

export default NotificationContext
