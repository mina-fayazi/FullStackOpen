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
          Title:
          <input
            data-testid='title-input'
            type="text"
            name="Title"
            placeholder="Enter blog title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            data-testid='author-input'
            type="text"
            name="Author"
            placeholder="Enter blog author"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input
            data-testid='url-input'
            type="text"
            name="URL"
            placeholder="Enter blog URL"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm