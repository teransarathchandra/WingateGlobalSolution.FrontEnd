import api from "../utils/apiUtils";

export const getAllRestrictedOrders = (aggType) => {
    if (aggType) {
        return api.get(`/restrictedOrderType?type=${aggType}`);
    } else {
        return api.get("/restrictedOrderType");
    }
    
};

export const getRestrictedOrderById = (id) => {
    return api.get(`/restrictedOrderType/${id}`);
};

export const createRestrictedOrder = (restrictedOrderData) => {
    return api.post("/restrictedOrderType", restrictedOrderData);
};

export const updateRestrictedOrder = (id, restrictedOrderData) => {
    return api.patch(`/restrictedOrderType/${id}`, restrictedOrderData);
};

export const deleteRestrictedOrder = (id) => {
    return api.delete(`/restrictedOrderType/${id}`);
};
