import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getSubTopicData = async (id) => {
  try {
    const res = await axios.get(
      //ini bisa
      // `http://127.0.0.1:8000/api/subtopicdata/7.5.1`,
      `http://127.0.0.1:8000/api/subtopicdata/${id}`,
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

export const getDetailSubTopicData = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/subtopicdata/show/${id}`,
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

export const createSubTopicData = async (data) => {
  console.log(data);
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/subtopicdata/store`,
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

export const removeSubTopicData = async (id) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/subtopicdata/delete/${id}`,
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

export const updateSubTopicData = async ({ data, id }) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/subtopicdata/update/${id}`,
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
