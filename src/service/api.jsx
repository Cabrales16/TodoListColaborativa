import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // raíz del json-server
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
