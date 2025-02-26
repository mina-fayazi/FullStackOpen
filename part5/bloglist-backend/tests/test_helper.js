const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Person One',
    url: 'http://example.com/first',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Person Two',
    url: 'http://example.com/second',
    likes: 10,
  },
]

// Create a database object ID that does not belong to any blog object
const nonExistingId = async () => {
  const blog = new Blog({ title: 'Temporary Blog', author: 'Temp Author', url: 'http://temp.com' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

// Check the blogs stored in the database
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb
}