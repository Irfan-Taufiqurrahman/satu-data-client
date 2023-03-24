import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import useAuth from "./useAuth";

function useFetchAuth(url) {
  const { logout } = useAuth();
  const [data, setData] = useState(null);
  // const [dataMemo, setDataMemo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cookies = new Cookies();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${cookies.get("Authorization")}` },
      });
      // setDataMemo(useMemo())
      setData(res.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // console.log("efek");
  }, [url]);

  const refetch = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${cookies.get("Authorization")}` },
      });
      setData(res.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export default useFetchAuth;
