const getUserAccessToken = () => {
  const tempToken = sessionStorage.getItem("app-usr-token")
  if (tempToken) {
    try {
      return JSON.parse(tempToken);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const setUserAccessToken = (token) => {
  sessionStorage.setItem("app-usr-token", JSON.stringify(token));
};

const getUserRefreshToken = () => {
  const tempToken = sessionStorage.getItem("app-usr-refresh-token");
  if (tempToken) {
    try {
      return JSON.parse(tempToken);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const setUserRefreshToken = (token) => {
  sessionStorage.setItem("app-usr-refresh-token", JSON.stringify(token));
};

const clearUserTokens = () => {
  sessionStorage.removeItem("app-usr-token");
  sessionStorage.removeItem("app-usr-refresh-token");
};

const clearUser = () => {
  sessionStorage.removeItem("app-usr");
};

export const authUserService = {
  getUserAccessToken,
  setUserAccessToken,
  getUserRefreshToken,
  setUserRefreshToken,
  clearUserTokens,
  clearUser
};
