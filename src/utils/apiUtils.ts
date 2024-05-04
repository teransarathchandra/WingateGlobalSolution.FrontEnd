import axios from "axios";
import toastUtil from "./toastUtil";
import { authService } from "@app_services/authService";
import { authUserService } from "@app_services/authUserService";
import { authEmployeeService } from "@app_services/authEmployeeService";
import store from "@app_redux/store";
import { startLoading, stopLoading } from "@app_redux/actions/loadingActions";

const BASE_URL = process.env.API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// Add a request interceptor to add the bearer token to the headers
api.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    store.dispatch(stopLoading());
    if (response && response.data.message) {
      toastUtil.success(response.data.message);
    }
    return response;
  },
  async (error) => {
    store.dispatch(stopLoading());
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest.url.includes("refresh_token")) {
      if (originalRequest.url.includes("employee")) {
        authEmployeeService.clearEmployeeTokens();
        authEmployeeService.clearEmployee();
      } else if (originalRequest.url.includes("user")) {
        authUserService.clearUserTokens();
        authUserService.clearUser();
      }
      authService.clearTokens();
      authService.clearUser();
      authService.clearSessionStorage();
      window.location.reload();

    } else if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await authService.refreshToken();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`; // update default token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // update current request token
        return api(originalRequest); // retry the request with the new token
      } catch (error) {
        toastUtil.error("Session expired. Please log in again.");
        return Promise.reject(error); // if refreshToken() fails
      }
    }

    if (error.response && error.response.data) {
      toastUtil.error(error.response.data.message);
    } else {
      toastUtil.error("An error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default api;
