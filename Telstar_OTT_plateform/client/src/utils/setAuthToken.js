import axios from "axios";
import api from "./api";
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
  } else delete axios.defaults.headers.common["x-auth-token"];
};

export default setAuthToken;
