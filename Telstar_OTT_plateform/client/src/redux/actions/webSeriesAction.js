import axios from "axios";
import {
  ADD_SERIE,
  DELETE_SERIE,
  GET_SERIE,
  GET_SERIES,
  UPDATE_SERIE,
} from "../types";
import api from "../../utils/api";
import { setAlert } from "./alertAction";
import { headerConfig } from "../../utils/commonConfig";

export const getSeries = () => async (dispatch) => {
  try {
    const res = await api.get("/webseries/getallwebseries", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(JSON.stringify(res));
    dispatch({ type: GET_SERIES, payload: res.data });
  } catch (err) {
    const errors = err.response.data.message;
    console.log(err.response);

    if (errors) {
      dispatch(setAlert(errors, "danger", 3000));
    }
  }
};

export const getSerieById = (serieId) => async (dispatch) => {
  try {
    const res = await api.get(`/webseries/get/${serieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    dispatch({ type: GET_SERIE, payload: res.data });
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.message;
    console.log(err.response);

    if (errors) {
      dispatch(setAlert(errors, "danger", 3000));
    }
  }
};

export const updateSerieById =
  (serieId, formData, navigate) => async (dispatch) => {
    try {
      var temp = [formData.languages];
      formData.languages = temp;
      temp = [formData.actors];
      formData.actors = temp;

      const body = JSON.stringify(formData);
      // console.log(body);
      const api1 = axios.create({
        baseURL: "/api",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const res = await api1.put(
        `/webseries/updateSeries/${serieId}`,
        body,
        headerConfig
      );

      dispatch({ type: UPDATE_SERIE, payload: res.data });
      console.log(res.data);
      dispatch(setAlert("Updated successfully", "success", 3000));
      navigate("/webseries");
    } catch (err) {
      const errors = err.response;
      console.log(err);

      if (errors) {
        dispatch(setAlert(errors, "danger", 3000));
      }
    }
  };

export const addSerie = (formData, navigate) => async (dispatch) => {
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
    //console.log(body);
    const api1 = axios.create({
      baseURL: "/api",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const res = await api1.post("/webseries/add", body, headerConfig);

    dispatch({ type: ADD_SERIE, payload: res.data });
    console.log(res.data);
    dispatch(setAlert("Added successfully", "success", 3000));
    navigate("/webseries");
  } catch (err) {
    const errors = err.response.data;
    console.log(err);

    if (errors) {
      dispatch(setAlert(errors, "danger", 3000));
    }
  }
};

export const deleteSerieById = (serieId, navigate) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete")) {
    try {
      const api1 = axios.create({
        baseURL: "/api",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const res = await api1.delete(
        `/webseries/delete/${serieId}`,
        headerConfig
      );

      dispatch({ type: DELETE_SERIE, payload: res.data });
      console.log(res.data);
      dispatch(setAlert("Deleted successfully", "success", 3000));
      navigate("/webseries");
    } catch (err) {
      const errors = err.response.data;
      console.log(err);

      if (errors) {
        dispatch(setAlert(errors, "danger", 3000));
      }
    }
  }
};
