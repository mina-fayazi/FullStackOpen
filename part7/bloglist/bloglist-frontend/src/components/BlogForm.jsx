import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleCreateBlog}>
        <Form.Group className='mb-2'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            data-testid='title-input'
            type='text'
            name='Title'
            placeholder='Enter blog title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            data-testid='author-input'
            type='text'
            name='Author'
            placeholder='Enter blog author'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Label>URL</Form.Label>
          <Form.Control
            data-testid='url-input'
            type='text'
            name='URL'
            placeholder='Enter blog URL'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </Form.Group>

        <div className='d-grid gap-2' style={{ marginTop: '10px' }}>
          <Button variant='success' size='lg' type='submit'>
            Create
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default BlogForm
