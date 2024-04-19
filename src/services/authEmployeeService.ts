const getEmployeeAccessToken = () => {
  return JSON.parse(sessionStorage.getItem("app-emp-token") || "");
};

const setEmployeeAccessToken = (token) => {
  sessionStorage.setItem("app-emp-token", JSON.stringify(token));
};

const getEmployeeRefreshToken = () => {
  return JSON.parse(sessionStorage.getItem("app-emp-refresh-token") || "");
};

const setEmployeeRefreshToken = (token) => {
  sessionStorage.setItem("app-emp-refresh-token", JSON.stringify(token));
};

const clearEmployeeTokens = () => {
  sessionStorage.removeItem("app-emp-token");
  sessionStorage.removeItem("app-emp-refresh-token");
};

export const authEmployeeService = {
  getEmployeeAccessToken,
  setEmployeeAccessToken,
  getEmployeeRefreshToken,
  setEmployeeRefreshToken,
  clearEmployeeTokens,
};
