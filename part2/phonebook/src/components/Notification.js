const successStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 25,
  maxWidth: 400,
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 25,
  maxWidth: 400,
}


const Notification = ({ notification }) => {
  if (notification.type === null) {
    return null
  }

  return (
    <div style={notification.type === 'success' ? successStyle : errorStyle}>
      {notification.message}
    </div>
  )
}

export default Notification