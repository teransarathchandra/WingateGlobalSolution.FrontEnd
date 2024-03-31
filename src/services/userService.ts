import api from "../utils/apiUtils";

export const getAllUser = () => {
    return api.get("/user");
};

export const getUserById = (id) => {
    return api.get(`/user/${id}`);
};

export const createUser = (userData) => {
    return api.post("/user", userData);
};

export const updateUser = (id, userData) => {
    return api.patch(`/user/${id}`, userData);
};

export const deleteUser = (id) => {
    return api.delete(`/user/${id}`);
};
