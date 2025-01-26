const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

// Reset the database before each test
beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
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

after(async () => {
  await mongoose.connection.close()
})
