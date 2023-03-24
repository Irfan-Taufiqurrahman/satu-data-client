import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/auth/logout";

const logoutApi = axios.create({
  baseURL: BASE_URL,
  method: "get",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default logoutApi;
