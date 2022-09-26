// we need to build the store for the app and
// create createStore --> redux
// thunk is mw:
// redux devtools extns needs to be integrated
// reducers
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// let currentState = store.getState();
// store.subscribe(() => {
//   // keep track of the previous and current state to compare changes
//   let previousState = currentState;
//   currentState = store.getState();
//   // if the token changes set the value in localStorage and axios headers
//   if (previousState.auth.token !== currentState.authReducer.token) {
//     const token = currentState.authReducer.token;
//     setAuthToken(token);
//   }
// });
export default store;
