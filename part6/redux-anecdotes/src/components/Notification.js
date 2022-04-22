import { useSelector } from "react-redux"

const Notification = (props) => {
  const notification = useSelector(state => state.notification)
  
  const style = {
    border: 'solid',
    borderColor: '#00ff00',
    backgroundColor: '#f2f2f2',
    width: '50%',
    padding: 10,
    borderWidth: 1,
    marginBottom: '20px'
  }
  
  if (notification !== null) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default Notification