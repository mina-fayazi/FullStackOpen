import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: '',
  },
  reducers: {
    setNotification(state, action) {
      const { message, type } = action.payload
      return { message, type }
    },
    clearNotification() {
      return { message: null, type: '' }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type = 'success', duration = 5) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
