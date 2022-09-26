import { REMOVE_ALERT, SET_ALERT } from "../types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action; // destructuring the action

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload); // removal purposes we will pass only alert id
    default:
      return state;
  }
};
