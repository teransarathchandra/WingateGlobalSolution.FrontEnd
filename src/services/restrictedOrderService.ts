import api from "../utils/apiUtils";

export const getAllRestrictedOrders = (aggType) => {
    if (aggType) {
        return api.get(`/restrictedOrder?type=${aggType}`);
    } else {
        return api.get("/restrictedOrder");
    }
    
};

export const getRestrictedOrderById = (id) => {
    return api.get(`/restrictedOrder/${id}`);
};

export const createRestrictedOrder = (restrictedOrderData) => {
    return api.post("/restrictedOrder", restrictedOrderData);
};

export const updateRestrictedOrder = (id, restrictedOrderData) => {
    return api.patch(`/restrictedOrder/${id}`, restrictedOrderData);
};

export const deleteRestrictedOrder = (id) => {
    return api.delete(`/restrictedOrder/${id}`);
};
