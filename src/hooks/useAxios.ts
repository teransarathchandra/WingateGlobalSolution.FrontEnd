import { useMemo } from "react";
import axios from "axios"; // Adjust the import path as necessary
import { useAuthContext } from "@app_contexts/authContext";
import toastUtil from "@app_utils/toastUtil";

const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const useAxios = () => {
    const { token } = useAuthContext();
    const api = useMemo(() => {

        instance.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        instance.interceptors.response.use(
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

        return instance;
    }, [token]);

    return api;
};

export default useAxios;
