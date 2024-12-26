import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const visibleForm = { 'display': visible ? '' : 'None' }
  const hideButton = { 'display': !visible ? '' : 'None' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <button
        onClick={toggleVisibility}
        style={hideButton}>
                    New blog
      </button>
      <div style={visibleForm}>
        {props.children}
        <button
          onClick={toggleVisibility}
          style={{ 'margin': 8 }}>
                        Cancel
        </button>
      </div>
    </div>
  )}
)

Togglable.displayName = 'Togglable'
export default Togglable