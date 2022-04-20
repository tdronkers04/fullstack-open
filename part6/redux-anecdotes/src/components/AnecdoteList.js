import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const filterTerm = useSelector(state => state.filter)
  const allAnecdotes = useSelector(state => state.anecdotes)
  const filteredAnecdotes = allAnecdotes.filter(anecdote => anecdote.content.includes(filterTerm))
  const sortedArray = filteredAnecdotes.slice().sort((a, b) => a.votes < b.votes)
  
  const vote = (id) => {
    let anecdoteContent = filteredAnecdotes.find(anecdote => anecdote.id === id).content.slice(0, 30)
    dispatch(voteAnecdote(id))
    dispatch(updateNotification(`Your vote for "${anecdoteContent}..." has been receieved`))
  }

  return (
    <div>
      {sortedArray
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            <br></br>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList