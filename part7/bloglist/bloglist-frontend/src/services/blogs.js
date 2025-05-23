import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// Set authentication token for requests
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// Fetch all blogs from backend
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get('/api/blogs', config)
  return response.data
}

// Create a new blog post
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

// Update a blog's likes (PUT request)
const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}
// Remove a blog post by the user who created it
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

// Add a comment to a blog
const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  )
  return response.data
}

export default { setToken, getAll, create, update, remove, addComment }
