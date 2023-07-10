import axios from 'axios';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export const SHOW_LOGIN_POPUP = 'SHOW_LOGIN_POPUP';
export const HIDE_LOGIN_POPUP = 'HIDE_LOGIN_POPUP';

const userLoginSuccess = (userInfo) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: userInfo,
  };
};

const userLoginFail = (error) => {
  return {
    type: USER_LOGIN_FAIL,
    payload: error,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

// LOGIN POPUP
export const showLoginPopup = () => {
  return {
    type: SHOW_LOGIN_POPUP,
  };
};
export const hideLoginPopup = () => {
  return {
    type: HIDE_LOGIN_POPUP,
  };
};

export const userLogin = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/login', { email, password });
    dispatch(userLoginSuccess(data));
  } catch (error) {
    dispatch(userLoginFail(error.response && error.response.data.message
      ? error.response.data.message
      : error.message));
  }
};