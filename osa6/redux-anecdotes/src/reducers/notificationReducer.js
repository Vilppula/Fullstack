import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
  name:'notification',
  initialState:['', 0],
  reducers: {
    showNotification(state, action) {
      state[0] = action.payload
    },
    setTimeOutId(state, action) {
      clearTimeout(state[1])
      state[1] = action.payload
    }
  }
})

export const { showNotification, setTimeOutId } = notificationSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(showNotification(text))
    const timeOutId = setTimeout(() => {dispatch(showNotification(''))}, time*1000)
    dispatch(setTimeOutId(timeOutId))
  }
}

export default notificationSlice.reducer