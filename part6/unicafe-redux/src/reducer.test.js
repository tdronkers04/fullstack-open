import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented x2', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, action)
    newState = counterReducer(newState, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 2
    })
  })

  test('reset stats button returns all zeros', () => {
    const reset = {
      type: 'ZERO'
    }

    const good = {
      type: 'GOOD'
    }

    const state = initialState
    deepFreeze(state)
    const newState1 = counterReducer(state, good)
    deepFreeze(newState1)
    const newState2 = counterReducer(newState1, good)
    deepFreeze(newState2)
    const newState3 = counterReducer(newState2, reset)
    expect(newState3).toEqual(initialState)
  })
})