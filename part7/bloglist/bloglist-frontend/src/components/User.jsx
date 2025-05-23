import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
