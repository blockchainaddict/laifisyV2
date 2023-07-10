import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import loginPopupReducer from './loginPopupSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    loginPopup: loginPopupReducer
  }
});
