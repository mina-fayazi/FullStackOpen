// Test the Blog component to check that it only displays the blog's title and author by default
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'Blog Component Default Display Test',
    author: 'Test Author',
    url: 'http://blogtest.com',
    likes: 5,
    user: {
      name: 'Test',
      username: 'blogtest'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  // Check visible content
  const summary = container.querySelector('.blog-summary')
  expect(summary).toHaveTextContent('Blog Component Default Display Test')
  expect(summary).toHaveTextContent('Test Author')

  // Check that hidden details are not in the DOM
  const details = container.querySelector('.blog-details')
  expect(details).toBeNull() // since details aren't rendered yet
})