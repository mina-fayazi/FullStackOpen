import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  return (
    <div className='blog-list' data-testid='blog'>
      <h2>Blogs</h2>
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link
                  to={`/blogs/${blog.id}`}
                  style={{ textDecoration: 'none', color: 'black' }}>
                  <em>{blog.title}</em>
                </Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
