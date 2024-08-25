import axios from "axios";

const api = axios.create({
  baseURL: "https://voting-system-back.onrender.com",
});

export default api;
