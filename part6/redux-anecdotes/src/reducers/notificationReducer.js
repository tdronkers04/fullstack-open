import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const notificationAction = (message, timeout) => {
  return async dispatch => {
    dispatch(updateNotification(message))
    setTimeout(() => {
      dispatch(updateNotification(null))
    }, timeout)
  }
}

export const { updateNotification } = notificationSlice.actions
export default notificationSlice.reducer