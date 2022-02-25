import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice ({
  name:'filter',
  initialState:'',
  reducers: {
    filterWith(state,action) {
      state = action.payload
      return state
    }
  }
})

export const { filterWith } = filterSlice.actions
export default filterSlice.reducer