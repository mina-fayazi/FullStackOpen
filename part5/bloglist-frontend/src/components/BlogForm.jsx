import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
	<div>
	  <h2>Create a new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title: <input value={title} onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
          Author: <input value={author} onChange={event => setAuthor(event.target.value)} />
        </div>
        <div>
          URL: <input value={url} onChange={event => setUrl(event.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
	</div>
  )
}

export default BlogForm