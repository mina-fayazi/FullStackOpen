import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client/react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setError, setToken, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const client = useApolloClient()

  const [ login ] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      const token = data.login.value
	  
	  localStorage.setItem('library-user-token', token)
      setToken(token)
	  
	  await client.resetStore()
	  
	  onLogin()
    },
    onError: (error) => {
      setError(error.message)
    }
  })
  
  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
	  <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm