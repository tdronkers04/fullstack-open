import { useDispatch } from "react-redux";
import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from "../reducers/notificationReducer";
import asObject from "../services/asObject";
import anecdotesService from '../services/anecdotesService'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    try {
      const anecdoteObj = asObject(content)
      const result = await anecdotesService.createAnecdote(anecdoteObj)
      console.log(result)
      dispatch(createAnecdote(anecdoteObj))
      dispatch(updateNotification(`New Note Created: "${content.slice(0, 30)}..."`))  
    
    } catch (error) {
      console.error(error.message)
    }
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