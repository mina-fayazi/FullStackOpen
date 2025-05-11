const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

// Reset the database before each test
beforeEach(async () => {
  await User.deleteMany({})
})

test('fails with a short username', async () => {
  const newUser = { username: 'ab', name: 'Short User', password: 'password' }
  const response = await api.post('/api/users').send(newUser).expect(400)

  assert.ok(response.body.error)
  assert.match(
    response.body.error,
    /Username and password must be at least 3 characters long/i
  )

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, 0)
})

test('fails with a short password', async () => {
  const newUser = { username: 'validUser', name: 'User', password: 'pw' }
  const response = await api.post('/api/users').send(newUser).expect(400)

  assert.ok(response.body.error)
  assert.match(
    response.body.error,
    /Username and password must be at least 3 characters long/i
  )

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, 0)
})

test('fails if username is missing', async () => {
  const newUser = { name: 'No Username', password: 'password' }
  const response = await api.post('/api/users').send(newUser).expect(400)

  assert.ok(response.body.error)
  assert.match(response.body.error, /Username and password are required/i)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, 0)
})

test('fails if password is missing', async () => {
  const newUser = { username: 'nopassword', name: 'No Password' }
  const response = await api.post('/api/users').send(newUser).expect(400)

  assert.ok(response.body.error)
  assert.match(response.body.error, /Username and password are required/i)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, 0)
})

test('fails if username already exists', async () => {
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password',
  }
  await api.post('/api/users').send(newUser)

  const response = await api.post('/api/users').send(newUser).expect(400)

  assert.ok(response.body.error)
  assert.match(response.body.error, /Username must be unique/i)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, 1) // Ensure only one user was created
})

after(async () => {
  await mongoose.connection.close()
})
