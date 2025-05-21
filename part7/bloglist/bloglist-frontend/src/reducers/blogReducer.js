import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlogLikes(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlogLikes, removeBlog } =
  blogSlice.actions

// Thunk actions
export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      dispatch(showNotification('Failed to fetch blogs', 'error'))
    }
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const created = await blogService.create(newBlog)
      dispatch(appendBlog(created))
      dispatch(
        showNotification(`Blog "${created.title}" by ${created.author} added!`)
      )
    } catch (error) {
      dispatch(showNotification('Failed to create blog', 'error'))
    }
  }
}

export const likeBlog = (updatedBlog) => {
  return async (dispatch) => {
    try {
      const returned = await blogService.update(updatedBlog.id, updatedBlog)
      dispatch(updateBlogLikes(returned))
      dispatch(
        showNotification(`Liked: ${returned.title} by ${returned.author}`)
      )
    } catch (error) {
      dispatch(showNotification('Error updating blog likes', 'error'))
    }
  }
}

export const deleteBlog = (id, title, author) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(showNotification(`Deleted blog "${title}" by ${author}`))
    } catch (error) {
      dispatch(showNotification('Error deleting blog', 'error'))
    }
  }
}

export default blogSlice.reducer
