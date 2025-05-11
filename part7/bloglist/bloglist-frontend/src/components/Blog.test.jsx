// Tests for the Blog component
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

// Define shared blog object for all tests
const blog = {
  title: 'Blog Component Default Display Test',
  author: 'Test Author',
  url: 'http://blogtest.com',
  likes: 5,
  user: {
    name: 'Test',
    username: 'blogtest',
  },
}

// Test that the component only displays the blog's title and author by default
test('renders title and author but not url or likes by default', () => {
  const { container } = render(<Blog blog={blog} />)

  // Check visible content
  const summary = container.querySelector('.blog-summary')
  expect(summary).toHaveTextContent('Blog Component Default Display Test')
  expect(summary).toHaveTextContent('Test Author')

  // Check that hidden details are not in the DOM
  const details = container.querySelector('.blog-details')
  expect(details).toBeNull() // since details aren't rendered yet
})

// Test that the component shows url and likes when the 'View' button is pressed
test('URL and number of likes are shown when the button is clicked', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.getByText(`Likes: ${blog.likes}`)).toBeDefined()
})

// Test if the event handler of the component is called twice when the 'Like' button is clicked twice
test('clicking the like button twice calls event handler twice', async () => {
  // Create the mock function
  const mockUpdateBlog = vi.fn()

  // Render the Blog component with the required mock function as a prop
  render(
    <Blog
      blog={blog}
      updateBlog={mockUpdateBlog}
      user={{ username: 'blogtest' }}
    />
  )

  // Simulate clicking the "View" button to show the like button
  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  // Find the Like button and click it twice
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateBlog.mock.calls).toHaveLength(2)
})

// Test that when the new blog form event handler is called, the props receive the right information
test('BlogForm calls onSubmit with correct data', async () => {
  const mockCreateBlog = vi.fn()
  const user = userEvent.setup()

  // Render the BlogForm component
  render(<BlogForm createBlog={mockCreateBlog} />)

  // Get form inputs by their placeholder text
  const titleInput = screen.getByPlaceholderText('Enter blog title')
  const authorInput = screen.getByPlaceholderText('Enter blog author')
  const urlInput = screen.getByPlaceholderText('Enter blog URL')
  const submitButton = screen.getByText('Create')

  // Simulate user typing and submitting
  await user.type(titleInput, 'Testing New Blog Form')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://blogtest.com')
  await user.click(submitButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual({
    title: 'Testing New Blog Form',
    author: 'Test Author',
    url: 'http://blogtest.com',
  })
})
