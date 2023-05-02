import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getTheamticData = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/thematicdata/${id}`,
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

export const createThematicData = async (data) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/thematicdata/store`,
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

export const removeThematicData = async (id) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/thematicdata/delete/${id}`,
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

export const updateThematicData = async ({ data, id }) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/thematicdata/update/${id}`,
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
