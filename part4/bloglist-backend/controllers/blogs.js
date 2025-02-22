const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Helper function to extract the token from the request headers
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Post a new blog
blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  
  // Verify token
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token invalid' })
  }
  
  // Find the user based on the decoded token
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(401).json({ error: 'User not found' })
  }
  
  // Ensure title and URL are provided for the new blog
  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }
  
  // Create the new blog post
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
	user: user._id
  })
  
  // Save the blog and update user's blog list
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

// Delete a blog by ID
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)

  if (!blog) {
    response.status(404).json({ error: 'Blog not found' })
  } else {
    response.status(204).end() // Successfully deleted
  }
})

// Update a blog by ID (specifically updating the number of likes)
blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).json({ error: 'Blog not found' })
  } else {
    blog.likes = request.body.likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  }
})

module.exports = blogsRouter