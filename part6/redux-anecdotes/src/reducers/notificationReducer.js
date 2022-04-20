import { createSlice } from '@reduxjs/toolkit'

const initialState = ["Hello World", "Fizz Buzz"]

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateNotification(state, action) {
      const content = action.payload
      state = state.concat(content)
      return state
    }
  }
})

export const { updateNotification } = notificationSlice.actions
export default notificationSlice.reducer