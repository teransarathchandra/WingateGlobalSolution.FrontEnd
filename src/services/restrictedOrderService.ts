import api from "../utils/apiUtils";

export const getAllRestrictedOrders = () => {
    return api.get("/restrictedOrder");
};

export const getRestrictedOrderById = (id) => {
    return api.get(`/restrictedOrder/${id}`);
};

export const createRestrictedOrder = (restrictedOrderData) => {
    return api.post("/restrictedOrder", restrictedOrderData);
};

export const updateRestrictedOrder = (id, restrictedOrderData) => {
    return api.put(`/restrictedOrder/${id}`, restrictedOrderData);
};

export const deleteRestrictedOrder = (id) => {
    return api.delete(`/restrictedOrder/${id}`);
};
