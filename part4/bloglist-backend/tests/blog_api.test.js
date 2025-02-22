const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

// Reset the database before each test
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  
  // Create a user before adding blogs
  const user = new User({ username: 'testuser', name: 'Test User', passwordHash: 'hashedpassword' })
  const savedUser = await user.save()
  
  // Attach user ID to blogs
  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: savedUser._id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(blog => {
    assert.strictEqual(typeof blog.id, 'string', 'Blog id should be defined and a string')
    assert.strictEqual(blog._id, undefined, 'Blog should not have _id')
  })
})

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Person',
    url: 'https://example.com/newblog',
    likes: 7
  }

  // Send POST request to add new blog
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)  // Ensure successful creation
    .expect('Content-Type', /application\/json/)

  // Get blogs after the POST request
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1, 'Blog count should increase by one')

  // Extract titles to check if the new blog exists
  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes(newBlog.title), 'New blog title should be present in the database')
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without Likes',
    author: 'Unknown',
    url: 'https://example.com/nolikes'
  }
  
  // Send POST request to add new blog
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Ensure that the default likes value for the new blog is zero
  assert.strictEqual(response.body.likes, 0, 'Default likes should be 0 when not provided')
  
  // Find the new blog in the database and ensure the value of likes equals to zero
  const savedBlog = await Blog.findOne({ title: 'Blog without Likes' })
  assert.strictEqual(savedBlog.likes, 0, 'Default likes should be 0 in database')
})

test('blog without title or url returns 400 Bad Request', async () => {
  const blogWithoutTitle = {
    author: 'Anonymous',
    url: 'https://example.com/notitle',
    likes: 5
  }

  // Send POST request for the blog without title
  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const blogWithoutUrl = {
    title: 'Missing URL',
    author: 'Anonymous',
    likes: 3
  }

  // Send POST request for the blog without url
  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)

  // Get blogs after the POST requests
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length, 'Invalid blogs should not be added')
})

test('update a blog by id (update likes)', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedLikes = blogToUpdate.likes + 1

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: updatedLikes })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, updatedLikes, 'Likes should be updated')

  // Ensure the blog is updated in the database
  const blogAfterUpdate = await Blog.findById(blogToUpdate.id)
  assert.strictEqual(blogAfterUpdate.likes, updatedLikes, 'Likes in the database should be updated')
})

test('update a blog returns 404 if blog does not exist', async () => {
  const nonExistingId = await helper.nonExistingId()

  await api
    .put(`/api/blogs/${nonExistingId}`)
    .send({ likes: 10 })
    .expect(404)
})

test('delete a blog by id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1, 'Blog count should decrease by one')

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title), 'Deleted blog should not be in the database')
})

test('delete a blog returns 404 if blog does not exist', async () => {
  const nonExistingId = await helper.nonExistingId()

  await api
    .delete(`/api/blogs/${nonExistingId}`)
    .expect(404)
})

test('blogs include user information', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.status, 200)

  response.body.forEach(blog => {
    assert(blog.user, 'Blog should have a user field')
    assert.strictEqual(typeof blog.user, 'object', 'User field should be an object')
    assert(blog.user.username, 'User object should contain username')
    assert(blog.user.name, 'User object should contain name')
  })
})

test('a valid blog post is assigned a user', async () => {
  const users = await User.find({})
  assert(users.length > 0, 'At least one user should exist')

  const newBlog = {
    title: 'New Blog with User',
    author: 'New Author',
    url: 'https://example.com/userblog',
    likes: 5
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert(response.body.user, 'New blog should have a user assigned')
  
  const savedBlog = await Blog.findById(response.body.id).populate('user')
  assert.strictEqual(savedBlog.user.username, users[0].username, 'Blog should be assigned to an existing user')
})

test('users include their created blogs', async () => {
  const response = await api.get('/api/users')
  assert.strictEqual(response.status, 200)

  response.body.forEach(user => {
    assert(Array.isArray(user.blogs), 'User should have a blogs array')
    
    user.blogs.forEach(blog => {
      assert(blog.title, 'Blog should have a title')
      assert(blog.url, 'Blog should have a URL')
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
