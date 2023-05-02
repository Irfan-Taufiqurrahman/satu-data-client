import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getAllMain = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/maindata", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const createMainData = async (data) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/maindata/store`,
      method: `post`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const removeMainData = async (id) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/maindata/delete/${id}`,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const updateMainData = async ({ data, id }) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/maindata/update/${id}`,
      method: "patch",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    // console.log(data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};
