import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterForm from './components/Filter'
import anecdotesService from './services/anecdotesService'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => {
      dispatch(setAnecdotes(anecdotes))
    }, [])
  })
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterForm />
      <br></br>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App