import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)

  const userBlogs = blogs.filter((blog) => blog.user?.id === id)
  const user = userBlogs[0]?.user

  if (!user) {
    return null // Handles refresh case
  }

  return (
    <div>
      <h2>{user?.name || user?.username}</h2>
      <h3>Added blogs</h3>
      <ListGroup>
        {userBlogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
              style={{ textDecoration: 'none', color: 'black' }}>
              {blog.title}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
