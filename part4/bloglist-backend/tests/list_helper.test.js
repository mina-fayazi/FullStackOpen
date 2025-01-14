const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const blogs = [
    { _id: "1", title: "React patterns", author: "Michael Chan", likes: 7 },
    { _id: "2", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", likes: 5 },
    { _id: "3", title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 },
    { _id: "4", title: "First class tests", author: "Robert C. Martin", likes: 10 },
    { _id: "5", title: "TDD harms architecture", author: "Robert C. Martin", likes: 0 },
    { _id: "6", title: "Type wars", author: "Robert C. Martin", likes: 2 }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
  
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36) // 7 + 5 + 12 + 10 + 0 + 2
  })
})

describe('favorite blog', () => {
  const blogs = [
    { _id: "1", title: "React patterns", author: "Michael Chan", likes: 7 },
    { _id: "2", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", likes: 5 },
    { _id: "3", title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 },
    { _id: "4", title: "First class tests", author: "Robert C. Martin", likes: 10 },
    { _id: "5", title: "TDD harms architecture", author: "Robert C. Martin", likes: 0 },
    { _id: "6", title: "Type wars", author: "Robert C. Martin", likes: 2 }
  ]

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
  
  test('when list has only one blog, it is the favorite', () => {
    const singleBlog = [
      {
        _id: "1",
        title: "React patterns",
        author: "Michael Chan",
        likes: 7
      }
    ]

    const result = listHelper.favoriteBlog(singleBlog)
    assert.deepStrictEqual(result, {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    })
  })
  
  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})
