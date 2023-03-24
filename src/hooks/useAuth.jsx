import registerApi from "../api/Signup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginApi from "../api/Login";
import csrfApi from "../api/csrf";
import Cookies from "universal-cookie";
import userApi from "../api/me";
import logoutApi from "../api/Logout";
import useAuthStore from "../Context/UserAuthStore";

const useAuth = () => {
  const { delUser } = useAuthStore();
  const { user, setUser } = useAuthStore();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const registerAccount = async (data) => {
    setLoading(true);
    try {
      const res = await registerApi({
        method: "post",
        data,
      });
      console.log(res.data);
      setResponse(res.data);
      navigate("/login", { state: "Akun Berhasil Dibuat Silahkan Login" });
    } catch (err) {
      console.log(err.response);
      setError(err.response);
    } finally {
      setLoading(false);
    }
  };
  const getCsrf = async () => {
    try {
      const res = await csrfApi();
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const login = async (data) => {
    // console.log(response);
    getCsrf();
    setLoading(true);
    try {
      const res = await loginApi({
        method: "post",
        data,
      });
      setResponse(res.data);
      cookies.set("Authorization", res.data.token);
      // console.log(res.data);
      const temp = await getUser();
      setUser(temp);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await logoutApi({
        headers: { Authorization: `Bearer ${cookies.get("Authorization")}` },
      });
      cookies.remove("Authorization");
      delUser();
      setResponse(res.data);
    } catch (err) {
      delUser();
      console.log(err.response.data);
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await userApi({
        headers: { Authorization: `Bearer ${cookies.get("Authorization")}` },
      });
      setResponse(res.data.user);
      return res.data.user;
    } catch (err) {
      console.log(err.response);
    }
  };

  return { response, loading, error, registerAccount, login, getUser, logout };
};

export default useAuth;