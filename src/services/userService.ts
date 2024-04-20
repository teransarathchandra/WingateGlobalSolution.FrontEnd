import api from "@app_utils/apiUtils";

export const verifyUser = (token) => {
    return api.get(`/user/verify-email/${token}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getAllUser = () => {
    return api.get("/user")
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const getUserById = (id) => {
    return api.get(`/user/${id}`)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const createUser = (userData) => {
    return api.post("/user", userData)
};

export const updateUser = (id, userData) => {
    return api.patch(`/user/${id}`, userData);
};

export const deleteUser = (id) => {
    return api.delete(`/user/${id}`);
};

export const getUserOrders = (userId) => {
    return api.get(`/user/orders/${userId}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};