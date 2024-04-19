const getUserAccessToken = () => {
  return JSON.parse(sessionStorage.getItem("app-usr-token") || "");
};

const setUserAccessToken = (token) => {
  sessionStorage.setItem("app-usr-token", JSON.stringify(token));
};

const getUserRefreshToken = () => {
  return JSON.parse(sessionStorage.getItem("app-usr-refresh-token") || "");
};

const setUserRefreshToken = (token) => {
  sessionStorage.setItem("app-usr-refresh-token", JSON.stringify(token));
};

const clearUserTokens = () => {
  sessionStorage.removeItem("app-usr-token");
  sessionStorage.removeItem("app-usr-refresh-token");
};

export const authUserService = {
  getUserAccessToken,
  setUserAccessToken,
  getUserRefreshToken,
  setUserRefreshToken,
  clearUserTokens,
};
