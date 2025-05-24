import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const blogs = useSelector((state) => state.blogs)

  // Collect users and their blog counts
  const usersMap = {}
  blogs.forEach((blog) => {
    const user = blog.user
    if (user) {
      usersMap[user.id] = usersMap[user.id] || {
        id: user.id,
        name: user.name || user.username,
        blogs: [],
      }
      usersMap[user.id].blogs.push(blog)
    }
  })
  const users = Object.values(usersMap)

  return (
    <div>
      <h2>Users</h2>
      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/users/${user.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}>
                  <em>{user.name}</em>
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
