import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      const content = action.payload
      return state.concat(content)
    },
    voteAnecdote(state, action) {
      const updatedObj = action.payload
      const newState = state.filter(anecdote => anecdote.id !== updatedObj.id).concat(updatedObj)
      return newState
    },
    setAnecdotes(state, action) {
      return action.payload
    } 
  }
})

// "action creators":

export const initializeAction = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAction = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.postAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVoteAction = (obj) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.putVote(obj.id, obj)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer