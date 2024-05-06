const getEmployeeAccessToken = () => {
  const tempToken = sessionStorage.getItem("app-emp-token");
  if (tempToken) {
    try {
      return JSON.parse(tempToken);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const setEmployeeAccessToken = (token) => {
  sessionStorage.setItem("app-emp-token", JSON.stringify(token));
};

const getEmployeeRefreshToken = () => {
  const tempToken = sessionStorage.getItem("app-emp-refresh-token");
  if (tempToken) {
    try {
      return JSON.parse(tempToken);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const setEmployeeRefreshToken = (token) => {
  sessionStorage.setItem("app-emp-refresh-token", JSON.stringify(token));
};

const clearEmployeeTokens = () => {
  sessionStorage.removeItem("app-emp-token");
  sessionStorage.removeItem("app-emp-refresh-token");
};

const clearEmployee = () => {
  sessionStorage.removeItem("app-emp");
};

export const authEmployeeService = {
  getEmployeeAccessToken,
  setEmployeeAccessToken,
  getEmployeeRefreshToken,
  setEmployeeRefreshToken,
  clearEmployeeTokens,
  clearEmployee
};
