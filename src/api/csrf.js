import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/sanctum/csrf-cookie";

const csrfApi = axios.create({
  baseURL: BASE_URL,
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
});

export default csrfApi;
