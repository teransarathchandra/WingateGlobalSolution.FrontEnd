import axios from "axios";
import toastUtil from "./toastUtil";
import { authService } from "@app_services/authService";
import { boolean } from "yup";

const BASE_URL = process.env.API_URL;

const apiX = {
  mode: (employeeMode: boolean = false) => {
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
        var token = () => any;
        if (employeeMode) {
          token = authService.getAccessToken();
        } else {
        }

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
        if (response && response.data.message) {
          toastUtil.success(response.data.message);
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // mark the request as retried
          try {
            const newAccessToken = await authService.refreshToken();
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`; // update default token
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`; // update current request token
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
  },
};

export default api;
