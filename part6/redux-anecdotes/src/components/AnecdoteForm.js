import { useDispatch } from "react-redux";
import { createAction } from '../reducers/anecdoteReducer'
import { updateNotification } from "../reducers/notificationReducer";
import asObject from "../services/asObject";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdoteObj = asObject(content)
    event.target.anecdote.value = ''
    dispatch(createAction(anecdoteObj))
    dispatch(updateNotification(`New Note Created: "${content.slice(0, 30)}..."`))  
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm