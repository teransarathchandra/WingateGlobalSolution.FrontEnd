import api from "@app_utils/apiUtils";
import { debug } from "util";

import { authUserService } from "@app_services/authUserService";
import { authEmployeeService } from "@app_services/authEmployeeService";

const getAccessToken = () => {
  return JSON.parse(sessionStorage.getItem("app-active-token") || "");
};

const setAccessToken = (token) => {
  sessionStorage.setItem("app-active-token", JSON.stringify(token));
};

const getRefreshToken = () => {
  return JSON.parse(sessionStorage.getItem("app-active-refresh-token") || "");
};

const setRefreshToken = (token) => {
  sessionStorage.setItem("app-active-refresh-token", JSON.stringify(token));
};

const clearTokens = () => {
  sessionStorage.removeItem("app-active-token");
  sessionStorage.removeItem("app-active-refresh-token");
};

const isInEmployeeMode = () => {
  const activeToken = getAccessToken();
  const usrToken = authUserService.getUserAccessToken();
  const empToken = authEmployeeService.getEmployeeAccessToken();

  if (activeToken === "") {
    return null;
  }

  if (empToken !== "") {
    return activeToken === empToken;
  }

  if (usrToken !== "") {
    return activeToken === usrToken;
  }

  return null;
};

const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  try {
    let refreshEndPoint = "/user/refresh-token";
    if (isInEmployeeMode() != null) {
      refreshEndPoint = isInEmployeeMode()
        ? "/employee/refresh-token"
        : "/user/refresh-token";
    }
    console.log("refreshToken", refreshToken, " endpoint: ", refreshEndPoint);
    const response = await api.post(refreshEndPoint, { refreshToken });
    const { newAccessToken, newRefreshToken } = response.data;
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    return newAccessToken;
  } catch (error) {
    clearTokens();

    throw error;
  }
};

export const authService = {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens,
  refreshToken,
  isInEmployeeMode,
};
