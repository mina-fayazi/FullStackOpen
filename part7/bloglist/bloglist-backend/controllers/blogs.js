const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Post a new blog
blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  // Ensure title and URL are provided for the new blog
  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  // Create the new blog post with the user from the userExtractor middleware
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: request.user._id, // The user is available in request.user
  })

  // Save the blog and update user's blog list
  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 }) // Ensure the saved blog includes full user details
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  response.status(201).json(savedBlog)
})

// Delete a blog by ID
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  // Ensure that the blog can be deleted only by the user who created it
  if (blog.user.toString() !== request.user.id)
    return response.status(401).json({ error: 'Unauthorized' })

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end() // Successfully deleted
})

// Update a blog's likes by ID (replacing the entire blog object)
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body

  // Construct the new blog object
  const updatedBlogData = {
    title,
    author,
    url,
    likes,
    user: typeof user === 'object' ? user.id : user, // Ensure it's just the ID
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlogData,
      { new: true, runValidators: true } // Return updated blog & validate data
    ).populate('user', { username: 1, name: 1 }) // Fetch full user details

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    response.json(updatedBlog)
  } catch (error) {
    response.status(400).json({ error: 'Invalid blog data' })
  }
})

// Add a comment to a blog
blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.comments = blog.comments.concat(comment)
  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
