// we have to make the entries of all available reducers at one place (i.e, /reducers/index.js)

// we have register all the reducers by adding then to "combineReducers" methos.

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducers from "./alertReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import movieReducer from "./movieReducer";
import webSeriesReducer from "./webSeriesReducer";
export default combineReducers({
  authReducer,
  alertReducers,
  profileReducer,
  postReducer,
  movieReducer,
  webSeriesReducer,
});
