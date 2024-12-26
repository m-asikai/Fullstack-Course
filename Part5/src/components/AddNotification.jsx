const AddNotification = ({ title, author }) => {
  if (!title || !author){
    return null
  }
  const notificationStyle = {
    color: 'green',
    fontSize: 24,
    border: '3px solid green',
    borderRadius: 4,
    backgroundColor: 'lightblue',
    textAlign: 'center',
    margin: 'auto',
    marginTop: 8,
    padding: 8,
    width: 'fit-content'
  }
  return (
    <p style={notificationStyle}>
            New blog created: {title} by {author}.
    </p>
  )
}

export default AddNotification