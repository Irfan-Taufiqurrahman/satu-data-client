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

export const createMainData = async () => {
  try {
    const res = await axios.post(`http://127.0.0.1:8000/api/maindata/store`, {
      headers: {
        Accept: "application/json",
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
    const res = await axios.patch(
      "http://127.0.0.1:8000/api/maindata/update/${id}",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("Authorization")}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};
