import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = ({ updateBlog, deleteBlog }) => {
  const navigate = useNavigate()

  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

  const loggedUser = useSelector((state) => state.user)

  if (!blog) {
    return <p>Blog not found</p>
  }

  const showDeleteButton = blog.user?.username === loggedUser?.user?.username

  const handleDelete = () => {
    deleteBlog(blog.id, blog.title, blog.author)
    navigate('/') // Redirect to home after deletion
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => updateBlog(blog)}>Like</button>
      </p>
      <p>Added by {blog.user?.name || blog.user?.username || 'Unknown'}</p>

      {showDeleteButton && (
        <button data-testid='delete-button' onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  )
}

export default Blog
