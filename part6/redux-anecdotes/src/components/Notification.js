import { useSelector } from "react-redux"

const Notification = (props) => {
  const notifications = useSelector(state => state.notifications)
  
  const style = {
    border: 'solid',
    borderColor: '#00ff00',
    backgroundColor: '#f2f2f2',
    width: '50%',
    padding: 10,
    borderWidth: 1,
    marginBottom: '20px'
  }
  return (
    <div style={style}>
      {notifications[notifications.length - 1]}
    </div>
  )
}

export default Notification