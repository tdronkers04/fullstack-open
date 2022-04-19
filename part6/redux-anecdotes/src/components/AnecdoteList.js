import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedArray = anecdotes.slice().sort((a, b) => a.votes < b.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    let anecdoteContent = anecdotes.find(anecdote => anecdote.id === id).content.slice(0, 30)
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