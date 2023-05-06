import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
// const BASE_URL = "http://127.0.0.1:8000/api/dataset/excel";

const DatasetApi = axios.create({
  // baseURL: BASE_URL,
  method: "put",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${cookies.get("Authorization")}`,
  },
  withCredentials: true,
});

export default DatasetApi;

export const getAllDataset = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/dataset/excel", {
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

export const getAllDetailData = async (id) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/dataset/excel/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("Authorization")}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const createDatasetData = async (data) => {
  try {
    // console.log(data);
    const res = await axios({
      url: `http://127.0.0.1:8000/api/dataset/excel/import`,
      method: `post`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies.get("Authorization")}`,
      },
    });
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err.response);
  }
};

export const removeDataset = async (id) => {
  // console.log(id);
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/dataset/excel/delete/${id}`,
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

export const updateDatasetData = async ({ data, id }) => {
  console.log(id);
  try {
    const res = await axios({
      url: `http://127.0.0.1:8000/api/dataset/excel/edit/${id}`,
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
