const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),

    authorCount: async () => Author.countDocuments(),

    allBooks: async (root, args) => {
      const filter = {}

      if (args.author) {
        const author = await Author.findOne({
          name: args.author,
        })

        if (!author) {
          return []
        }

        filter.author = author._id
      }

      if (args.genre) {
        filter.genres = args.genre
      }

      return Book.find(filter).populate('author')
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      const bookCounts = await Book.aggregate([
        {
          $group: {
            _id: '$author',
            count: { $sum: 1 },
          },
        },
      ])
    
      const countsByAuthor = new Map(
        bookCounts.map((item) => [
          item._id.toString(),
          item.count,
        ])
      )
    
      return authors.map((author) => {
        author.bookCount =
          countsByAuthor.get(author._id.toString()) || 0
    
        return author
      })
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }

      let author = await Author.findOne({
        name: args.author,
      })

      if (!author) {
        try {
          author = await new Author({
            name: args.author,
          }).save()
        } catch (error) {
          throw new GraphQLError(`Saving author failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const book = new Book({
        ...args,
        author: author._id,
      })

      try {
        await book.save()
        await book.populate('author')
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }

      const author = await Author.findOne({
        name: args.name,
      })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(`Updating author failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return author
    },

    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode')
      }
      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
