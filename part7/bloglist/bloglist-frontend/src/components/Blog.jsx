import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, setCommentInput } from '../reducers/blogReducer'

const Blog = ({ updateBlog, deleteBlog }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

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

  const handleCommentChange = (event) => {
    dispatch(setCommentInput({ id: blog.id, comment: event.target.value }))
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    if (blog.commentInput?.trim()) {
      dispatch(addComment(blog.id, blog.commentInput))
    }
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

      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          value={blog.commentInput || ''}
          onChange={handleCommentChange}
          placeholder='Write a comment'
        />
        <button type='submit'>Add Comment</button>
      </form>

      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((c, index) => <li key={index}>{c}</li>)
        ) : (
          <li>No comments yet.</li>
        )}
      </ul>
    </div>
  )
}

export default Blog
