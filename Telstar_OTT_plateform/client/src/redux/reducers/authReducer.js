// we have to hold the token
// need to hold user information
// authenticationStatus
// loading: true/false  ==> spinner

import {
  ACCOUNT_DELETED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action; // action will have data bcoz using the rest call  data came to "action" state. That's why we put name as action here, but we can put any name.
  // type : reducer flag : we can manipulate the state (global one store)
  // payload : info to store it into the store

  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.accessToken);
      return { ...state, isAuthenticated: true, loading: false, user: payload }; // means only change the "isAuthenticated: true, loading: false", rest of the state(or initial state) will be same.
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, loading: false, token: null };
    case ACCOUNT_DELETED:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
