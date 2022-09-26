import {
  ADD_MOVIE,
  DELETE_MOVIE,
  GET_MOVIE,
  GET_MOVIES,
  UPDATE_MOVIE,
  GET_GENRE_BASED_MOVIES,
} from "../types";

const initialState = {
  movies: [],
  movie: {},
  genreBasedMovies: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MOVIES:
      return { ...state, movies: payload, movie: null };
    case GET_MOVIE:
      return { ...state, movie: payload };
    case ADD_MOVIE:
      return { ...state, movie: payload };
    case DELETE_MOVIE:
      return { ...state, movie: payload };
    case UPDATE_MOVIE:
      return { ...state, movie: payload };
    case GET_GENRE_BASED_MOVIES:
      return { ...state, genreBasedMovies: payload };
    default:
      return state;
  }
};
