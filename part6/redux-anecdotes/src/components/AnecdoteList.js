import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedArray = anecdotes.slice().sort((a, b) => a.votes < b.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
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