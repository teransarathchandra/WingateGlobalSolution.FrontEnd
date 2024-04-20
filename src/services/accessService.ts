import api from "@app_utils/apiUtils";

export const getAllAccess = () => {
  return api
    .get("/systemAccess")
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const getAccessById = (id) => {
  return api
    .get(`/systemAccess/${id}`)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const createAccess = (accessData) => {
  return api
    .post("/systemAccess", accessData)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const updateAccess = (id, accessData) => {
  return api
    .put(`/systemAccess/${id}`, accessData)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const deleteAccess = (id) => {
  return api
    .delete(`/systemAccess/${id}`)
    .then((response) => response.data)
    .catch((error) => error.message);
};
