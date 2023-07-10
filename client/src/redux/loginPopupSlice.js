import { createSlice } from '@reduxjs/toolkit'

export const loginPopupSlice = createSlice({
  name: 'loginPopup',
  initialState: {
    value: false
  },
  reducers: {
    showLoginPopup: (state) => {
      state.value = true
    },
    hideLoginPopup: (state) => {
      state.value = false
    }
  }
})

export const { showLoginPopup, hideLoginPopup } = loginPopupSlice.actions

export default loginPopupSlice.reducer
