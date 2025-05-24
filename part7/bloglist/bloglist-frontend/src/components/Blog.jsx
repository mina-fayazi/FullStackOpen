import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, setCommentInput } from '../reducers/blogReducer'
import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ updateBlog, deleteBlog }) => {
  const { id } = useParams()
  const navigate = useNavigate()
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
        <Button size='sm' variant='primary' onClick={() => updateBlog(blog)}>
          Like
        </Button>
      </p>
      <p>Added by {blog.user?.name || blog.user?.username || 'Unknown'}</p>

      {showDeleteButton && (
        <Button
          size='sm'
          variant='danger'
          data-testid='delete-button'
          onClick={handleDelete}>
          Delete
        </Button>
      )}

      <h3 className='mt-4'>Comments</h3>
      <Form onSubmit={handleCommentSubmit} className='mb-3'>
        <Form.Group controlId='commentInput'>
          <Form.Control
            type='text'
            placeholder='Write a comment'
            value={blog.commentInput || ''}
            onChange={handleCommentChange}
          />
        </Form.Group>
        <Button type='submit' className='mt-2' size='sm'>
          Add Comment
        </Button>
      </Form>

      <ListGroup>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((c, i) => (
            <ListGroup.Item key={i}>{c}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No comments yet.</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default Blog
