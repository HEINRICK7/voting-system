import axios from "axios";

const api = axios.create({
  baseURL: "https://voting-system-back.onrender.com",
});
//baseURL: "http://localhost:5000",
export default api;
