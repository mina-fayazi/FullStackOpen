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
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    addCommentToBlog(state, action) {
      const { id, updatedBlog } = action.payload
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    setCommentInput(state, action) {
      const { id, comment } = action.payload
      return state.map((blog) =>
        blog.id !== id ? blog : { ...blog, commentInput: comment }
      )
    },
    clearCommentInput(state, action) {
      const id = action.payload
      return state.map((blog) =>
        blog.id !== id ? blog : { ...blog, commentInput: '' }
      )
    },
  },
})

export const {
  setBlogs,
  appendBlog,
  updateBlog,
  removeBlog,
  addCommentToBlog,
  setCommentInput,
  clearCommentInput,
} = blogSlice.actions

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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user?.id || blog.user, // Ensure it's just the ID
      }

      const returned = await blogService.update(blog.id, updatedBlog)
      dispatch(updateBlog(returned))
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

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      dispatch(
        addCommentToBlog({
          id,
          updatedBlog: { ...updatedBlog, commentInput: '' },
        })
      )
      dispatch(clearCommentInput(id))
      dispatch(showNotification('Comment added'))
    } catch (error) {
      dispatch(showNotification('Failed to add comment', 'error'))
    }
  }
}

export default blogSlice.reducer
