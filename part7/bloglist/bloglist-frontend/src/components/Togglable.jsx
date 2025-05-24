import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      {!visible && <Button onClick={toggleVisibility}>{buttonLabel}</Button>}
      {visible && (
        <div>
          {children}
          <div className='d-grid gap-2' style={{ marginTop: '10px' }}>
            <Button variant='secondary' size='lg' onClick={toggleVisibility}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})

// Set a display name for debugging
Togglable.displayName = 'Togglable'

// Define PropTypes
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Togglable
