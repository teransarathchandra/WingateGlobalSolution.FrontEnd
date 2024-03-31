import axios from "axios";
import toastUtil from "./toastUtil";

const BASE_URL = process.env.API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to add the bearer token to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Assuming you store your token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      toastUtil.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      toastUtil.error(error.response.data.message);
    } else {
      toastUtil.error("An error occurred. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default api;
