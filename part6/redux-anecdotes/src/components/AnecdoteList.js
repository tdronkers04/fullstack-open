import { useSelector, useDispatch } from "react-redux";
import { updateVoteAction } from "../reducers/anecdoteReducer";
import { updateNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const filterTerm = useSelector(state => state.filter)
  const allAnecdotes = useSelector(state => state.anecdotes)
  const filteredAnecdotes = allAnecdotes.filter(anecdote => anecdote.content.includes(filterTerm))
  const sortedArray = filteredAnecdotes.slice().sort((a, b) => a.votes < b.votes)
  
  const vote = (anecdote) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    dispatch(updateVoteAction(changedAnecdote))
    dispatch(updateNotification(`Your vote for "${changedAnecdote.content.slice(0, 30)}..." has been receieved`))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            <br></br>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList