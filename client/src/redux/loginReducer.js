import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from './actions';

const initialState = {
  userInfo: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, error: action.payload };
    case USER_LOGOUT:
      return { userInfo: null, error: null };
    default:
      return state;
  }
};

export default loginReducer;
