import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const created = await blogService.create(newBlog)
    dispatch(appendBlog(created))
    return created
  }
}

export default blogSlice.reducer
