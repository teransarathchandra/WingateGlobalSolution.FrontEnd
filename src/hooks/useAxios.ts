import { useEffect } from "react";
import axios from "axios"; // Adjust the import path as necessary
import { useActiveAuthContext } from "@app_contexts/authActiveContext";
//import { useEmpAuthContext } from "@app_contexts/employee/empAuthContext";
import toastUtil from "@app_utils/toastUtil";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Setup interceptors once, outside the hook to avoid re-registration.
axiosInstance.interceptors.response.use(
  (response) => {
    toastUtil.success(response.data.message);
    return response;
  },
  (error) => {
    toastUtil.error(
      error.response?.data?.message || "An error occurred. Please try again."
    );
    return Promise.reject(error);
  }
);

const useAxios = () => {
  const { activeToken } = useActiveAuthContext();
  // Dynamically set the Authorization header for outgoing requests.
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (activeToken) {
          console.log("Test");
          config.headers.Authorization = `Bearer ${activeToken}`;
        }
        return config;
      }
    );

    return () => {
      // Eject the interceptor when the component unmounts or the token changes.
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [activeToken]);

  return axiosInstance;
};

export default useAxios;
