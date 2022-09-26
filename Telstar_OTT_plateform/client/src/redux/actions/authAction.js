import axios from "axios";
import { headerConfig } from "../../utils/commonConfig";
import {
  ACCOUNT_DELETED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../types";
import { setAlert } from "../../redux/actions/alertAction";
import setAuthToken from "../../utils/setAuthToken";
import api from "../../utils/api";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      const res = await api.get("/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }
};

export const register =
  ({ firstName, lastName, email, doj, dob, username, password }) =>
  async (dispatch) => {
    // have to write action story
    // rest call action
    // api call
    const data = JSON.stringify({
      firstName,
      lastName,
      email,
      doj,
      dob,
      username,
      password,
    });
    try {
      const res = await api.post("/auth/signup", data, headerConfig); // headerConfig defining the type of data like json, img, etc. Here data is type Json

      // this dispatch will coonect with the middleware
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const { errors } = err.response.data;
      // errors is an aaray of error

      // error is an aaray of errors ==> this is error details for every field ==> we need to display it to user screen ==> these details we will share it to alert by calling its alertAction ==> alert action will set the details into store via reducer ==> details will be displayed by component(alert)
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger", 3000)));
      }

      dispatch({ type: REGISTER_FAIL });
    }

    // url
    // success part then method call ==> we have to share the details to make some changes to your store as per the action.
    // failure catch method call ==> we have to share the failure details to make some changes to your store as per the action.
    // success/ failure action details includes 2 parts
    // 1. type
    // 2. payload (data to be inserted / manipulate/deleted ) from the store.
  };

export const login = (username, password) => async (dispatch) => {
  try {
    const body = JSON.stringify({ username, password });
    const res = await api.post("/auth/signin", body);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({ type: LOGIN_FAIL });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
