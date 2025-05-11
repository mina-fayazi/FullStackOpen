const Notification = ({ message, type }) => {
  if (!message) return null // If no message, don't render anything

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
