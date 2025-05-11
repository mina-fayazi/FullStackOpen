import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user, showNotification }) => {
  const [visible, setVisible] = useState(false)

  // Handles like button click, sending a PUT request to update likes
  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user, // Keep the full user object
    }

    updateBlog(updatedBlog)
  }

  return (
    <div
      className='blog'
      data-testid='blog'
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
      }}>
      <div className='blog-summary'>
        <span data-testid='blog-title'>{blog.title}</span> {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}{' '}
            <button data-testid='like-button' onClick={handleLike}>
              Like
            </button>
          </p>
          <p>Added by: {blog.user?.name || 'Unknown'}</p>{' '}
          {/* Display the name of the user who created the blog */}
          {user?.username ===
            (typeof blog.user === 'object'
              ? blog.user?.username // If blog.user is an object, use its username
              : user?.username) && ( // If blog.user is just an ID (string), assume it belongs to the logged-in user
            <button
              data-testid='delete-button'
              onClick={() => deleteBlog(blog.id, blog.title, blog.author)}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
