import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getTopicData = async (id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/topicdata/${id}`, {
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

export const getDetailTopicData = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/topicdata/show/${id}`,
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

export const createTopicData = async (data) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/topicdata/store`,
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

export const removeTopicData = async (id) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/topicdata/delete/${id}`,
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

export const updateTopicData = async ({ data, id }) => {
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/topicdata/update/${id}`,
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
