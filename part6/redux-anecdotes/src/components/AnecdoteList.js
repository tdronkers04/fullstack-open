import { useSelector, useDispatch } from "react-redux";
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAction(id))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => a.votes < b.votes)
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