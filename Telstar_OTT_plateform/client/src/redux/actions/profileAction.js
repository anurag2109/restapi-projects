import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../types";
import { setAlert } from "./alertAction";
import { headerConfig } from "../../utils/commonConfig";
import api from "../../utils/api";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get(`/auth/AK00000022`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(JSON.stringify(err.response));
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// create or update a profile
// arguments:
//data : which will hold the profile information
// purpose : which will create or update the profile action
// based on the action we need to naviagte the user to the dashboard if operation is successful
export const createProfile =
  (formData, naviagte, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post("/profile", formData, headerConfig);
      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch(
        setAlert(edit ? "Profile updated" : "Profile Created", "success")
      );
      if (!edit) {
        naviagte("/dashboard");
      }
    } catch (err) {
      const { errors } = err.response.data;

      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.put("/profile/experience", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.put("/profile/education", formData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteAccount = (naviagte) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete this account?")) {
    try {
      await api.delete("/profile");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      naviagte("/");
      dispatch(setAlert("Account deleted successfully", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE }); // clear the current user's profile, bcoz we don't need this

  try {
    const res = await api.get("/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${userId}`); // this url is mentioned here because backend will throw the data on that url
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
  }
};
