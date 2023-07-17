import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: false,
    email: ''
  },
  reducers: {
    userLoginSuccess: (state, action) => {
      state.value = true;
      state.email = action.payload.email;
    },
    userLoginFail: (state) => {
      state.value = false;
      state.email = '';
    },
    userLogout: (state) => {
        state.value = false;
        state.email = '';
    }
  }
});

export const { userLoginSuccess, userLoginFail, userLogout } = loginSlice.actions;

export default loginSlice.reducer;
