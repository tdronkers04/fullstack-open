import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'

describe('anecdotes app reducer', () => {
  let initialState = [
    {
      content: 'If it hurts, do it more often',
      id: 1,
      votes: 5
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      id: 2,
      votes: 0
    }
  ]

  test('a new anecdote can be added', () => {
    const action = {
      type: 'ADD',
      body: {
        content: 'hello world'
      }
    }

    const state = deepFreeze(initialState)
    const newState = reducer(state, action)
    expect(newState[2].content).toBe('hello world')
  })
  
  test('vote for first anecdote increments the state', () => {
    const action = {
      type: 'VOTE',
      body: {
        id: 1
      }
    }

    const state = deepFreeze(initialState)
    const newState = reducer(state, action)
    expect(newState).toEqual([
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 6
      },
      {
        content: 'Adding manpower to a late software project makes it later!',
        id: 2,
        votes: 0
      }
    ])
      
  })
})