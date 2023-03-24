import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/auth/login";

const loginApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default loginApi;
