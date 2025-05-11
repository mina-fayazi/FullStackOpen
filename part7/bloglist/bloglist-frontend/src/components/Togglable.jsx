import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
      {!visible && <button onClick={toggleVisibility}>{buttonLabel}</button>}
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
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
