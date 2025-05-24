import { Alert } from 'react-bootstrap'

const Notification = ({ message, type }) => {
  if (!message) return null // If no message, don't render anything

  return (
    <Alert variant={type === 'error' ? 'danger' : 'success'}>{message}</Alert>
  )
}

export default Notification
