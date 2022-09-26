import axios from "axios";
// create an instance of axios
const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});
export default api;
