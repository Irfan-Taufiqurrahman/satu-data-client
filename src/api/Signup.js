import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/auth/register";

const registerApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default registerApi;
