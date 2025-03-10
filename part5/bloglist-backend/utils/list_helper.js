// Load the full build of Lodash
const _ = require('lodash')

// dummy function, receives a list of blogs and always returns the value 1
const dummy = (blogs) => {
  return 1
}

// totalLikes function, receives a list of blogs and returns the total sum of likes
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// favoriteBlog function, receives a list of blogs and returns the blog with the most likes
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

// mostBlogs function, receives a list of blogs and returns the author who has the largest amount of blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(Object.keys(authorCounts), author => authorCounts[author])

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  }
}

// mostLikes function, receives a list of blogs and returns the author with the largest amount of total likes
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const grouped = _.groupBy(blogs, 'author')
  const authorLikes = _.map(grouped, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }))

  return _.maxBy(authorLikes, 'likes')
}

// Export the modules
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}