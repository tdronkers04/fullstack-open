import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    updateFilter(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer