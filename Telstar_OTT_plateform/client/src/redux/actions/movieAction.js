import axios from "axios";
import {
  ADD_MOVIE,
  DELETE_MOVIE,
  GET_GENRE_BASED_MOVIES,
  GET_MOVIE,
  GET_MOVIES,
  UPDATE_MOVIE,
} from "../types";
import api from "../../utils/api";
import { setAlert } from "./alertAction";
import { headerConfig, headerConfigAfterLogin } from "../../utils/commonConfig";

export const getMovies = () => async (dispatch) => {
  try {
    const res = await api.get("/movie/getallmovie", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: GET_MOVIES, payload: res.data });
  } catch (err) {
    const errors = err.response.data.message;
    console.log(err.response);

    if (errors) {
      dispatch(setAlert(errors, "danger", 3000));
    }
  }
};

export const getMovieById = (movieId) => async (dispatch) => {
  try {
    const res = await api.get(`/movie/get/${movieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    dispatch({ type: GET_MOVIE, payload: res.data });
    // console.log(res.data);
  } catch (err) {
    const errors = err.response.data.message;
    console.log(err.response);

    if (errors) {
      dispatch(setAlert(errors, "danger", 3000));
    }
  }
};
export const getMovieByGenre = (genre) => async (dispatch) => {
  try {
    const res = await api.get(`/movie/getmoviebygenre/${genre}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    dispatch({ type: GET_GENRE_BASED_MOVIES, payload: res.data, flag: false });
  } catch (err) {
    const errors = err.response.data.message;
    console.log(err.response);

    if (errors) {
      dispatch(setAlert(errors, "danger", 3000));
    }
  }
};

export const updateMovieById =
  (movieId, formData, navigate) => async (dispatch) => {
    try {
      var temp = [formData.languages];
      formData.languages = temp;
      temp = [formData.actors];
      formData.actors = temp;

      const body = JSON.stringify(formData);
      // console.log(body);
      const api1 = axios.create({
        baseURL: "/api/movie",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(body);
      const res = await api1.put(`/update-movie/${movieId}`, body);
      console.log(res);

      dispatch({ type: UPDATE_MOVIE, payload: res.data });
      // console.log(res.data);
      dispatch(setAlert("Updated successfully", "success", 3000));
      navigate("/movies");
    } catch (err) {
      const errors = err.response;
      console.log(err);

      if (errors) {
        dispatch(setAlert(errors, "danger", 3000));
      }
    }
  };

export const addMovie = (formData, navigate) => async (dispatch) => {
  try {
    if (Array.isArray(formData.languages) === false) {
      var temp = [formData.languages];
      formData.languages = temp;
    }
    if (Array.isArray(formData.actors) === false) {
      var temp1 = [formData.actors];
      formData.actors = temp1;
    }

    const body = JSON.stringify(formData);
    // console.log(body);
    const api1 = axios.create({
      baseURL: "/api",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const res = await api1.post("/movie/add", body);

    dispatch({ type: ADD_MOVIE, payload: res.data });
    console.log(res.data);
    dispatch(setAlert("Added successfully", "success", 3000));
    navigate("/movies");
  } catch (err) {
    const errors = err.response.data;
    console.log(err);

    if (errors) {
      dispatch(setAlert(errors, "danger", 3000));
    }
  }
};

export const deleteMovieById = (movieId, navigate) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete")) {
    try {
      const api1 = axios.create({
        baseURL: "/api/movie",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const res = await api1.delete(`/delete/${movieId}`);

      dispatch({ type: DELETE_MOVIE, payload: res.data });
      console.log(res.data);
      dispatch(setAlert("Deleted successfully", "success", 3000));
      navigate("/movies");
    } catch (err) {
      const errors = err.response.data;
      console.log(err);

      if (errors) {
        dispatch(setAlert(errors, "danger", 3000));
      }
    }
  }
};
