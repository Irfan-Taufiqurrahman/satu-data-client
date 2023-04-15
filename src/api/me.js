import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/me";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const userApi = axios.create({
  baseURL: BASE_URL,
  method: "get",
  headers: {
    "Content-Type": "application/json",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("Authorization")}`,
    },
  },
});

export default userApi;
