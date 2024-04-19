import api from "@app_utils/apiUtils";

const getAccessToken = () => {
  return JSON.parse(sessionStorage.getItem("app-token") || "");
};

const setAccessToken = (token) => {
  sessionStorage.setItem("app-token", JSON.stringify(token));
};

const getRefreshToken = () => {
  return JSON.parse(sessionStorage.getItem("app-refresh-token") || "");
};

const setRefreshToken = (token) => {
  sessionStorage.setItem("app-refresh-token", JSON.stringify(token));
};

const clearTokens = () => {
  sessionStorage.removeItem("app-token");
  sessionStorage.removeItem("app-refresh-token");
};

const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await api.post(`/user/refresh-token`, { refreshToken });
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
};
