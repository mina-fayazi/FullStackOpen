import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, user, showNotification }) => {
  const [visible, setVisible] = useState(false)
  
  // Handles like button click, sending a PUT request to update likes
  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user, // Keep the full user object
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      updateBlog(returnedBlog) // Update the blog list in App.jsx
	  showNotification(`Liked: ${blog.title} by ${blog.author}`, 'success')
    } catch (error) {
      //console.error('Error updating likes:', error)
	  showNotification('Error updating blog likes', 'error')
    }
  }

  return (
    <div style={{
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
		  <p>Added by: {blog.user?.name || 'Unknown'}</p> {/* Display the name of the user who created the blog */}
		  {user?.username === blog.user?.username && (
            <button onClick={() => deleteBlog(blog.id, blog.title, blog.author)}>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog