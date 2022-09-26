import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../types";

// profile related details
// currentProfileDetails
// allProfileDetails
// github repos
// loading status
// error details
const initialState = {
  profile: null, // current profile
  profiles: [], // list of profiles / all profiles
  repos: [], // list of repos
  loading: true, //
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REPOS:
      return { ...state, repos: payload, loading: false };

    case NO_REPOS:
      return { ...state, repos: [] };

    case UPDATE_PROFILE:
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };

    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, profile: null };

    case CLEAR_PROFILE:
      return { ...state, loading: false, profile: null, repos: [] };

    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };

    default:
      return state;
  }
};
