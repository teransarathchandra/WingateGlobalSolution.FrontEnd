import api from "@app_utils/apiUtils";

export const getAllEmployee = (aggType?) => {
  if (aggType) {
    return api
      .get(`/employee?type=${aggType}`)
      .then((response) => response.data)
      .catch((error) => error.message);
  } else {
    return api
      .get("/employee")
      .then((response) => response.data)
      .catch((error) => error.message);
  }
};

export const getEmployeeById = (id) => {
  return api
    .get(`/employee/${id}`)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const createEmployee = (accessData) => {
  return api
    .post("/employee", accessData)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const updateEmployee = (id, accessData) => {
  return api
    .patch(`/employee/${id}`, accessData)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const deleteEmployee = (id) => {
  return api
    .delete(`/employee/${id}`)
    .then((response) => response.data)
    .catch((error) => error.message);
};
