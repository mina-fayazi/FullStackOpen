import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

// Render the login form
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          data-testid='username'
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          data-testid='password'
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Login
      </Button>
    </Form>
  )
}

// Define PropTypes
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
