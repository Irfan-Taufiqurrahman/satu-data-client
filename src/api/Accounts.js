import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getAllUser = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/admin", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const updateUser = async (data, id) => {
  console.log(id);
  try {
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/admin/edit/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("Authorization")}`,
        },
      }
    );
    // data: data,
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const removeUser = async (id) => {
  try {
    const res = await axios.delete(`http://127.0.0.1:8000/api/admin/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("Authorization")}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};
