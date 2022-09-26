import {
  ADD_SERIE,
  DELETE_SERIE,
  GET_SERIE,
  GET_SERIES,
  UPDATE_SERIE,
} from "../types";

const initialState = {
  series: [],
  serie: {},
};

export default (state = initialState, action) => {
  console.log(JSON.stringify(action));
  const { type, payload } = action;
  switch (type) {
    case GET_SERIES:
      return { ...state, series: payload, serie: null };
    case GET_SERIE:
      return { ...state, serie: payload };
    case ADD_SERIE:
      return { ...state, serie: payload };
    case DELETE_SERIE:
      return { ...state, serie: payload };
    case UPDATE_SERIE:
      return { ...state, serie: payload };
    default:
      return state;
  }
};
