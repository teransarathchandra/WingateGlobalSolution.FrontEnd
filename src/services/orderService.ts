import api from "@app_utils/apiUtils";

export const getAllOrders = () => {
    return api.get("/order");
};

export const getOrderById = (id) => {
    return api.get(`/order/${id}`);
};

export const createOrder = (orderData) => {
    return api.post("/order", orderData);
};

export const updateOrder = (id, orderData) => {
    return api.put(`/order/${id}`, orderData);
};

export const deleteOrder = (id) => {
    return api.delete(`/order/${id}`);
};
