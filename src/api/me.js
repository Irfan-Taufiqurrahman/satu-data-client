import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/me";

const userApi = axios.create({
  baseURL: BASE_URL,
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
});

export default userApi;
