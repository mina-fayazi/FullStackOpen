import { Link } from 'react-router-dom'

const BlogList = ({ blog }) => {
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
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default BlogList
