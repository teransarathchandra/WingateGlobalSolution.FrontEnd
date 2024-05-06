 import api from "../utils/apiUtils";

export const getAllRestrictedOrders = (aggType) => {
    if (aggType) {
        return api.get(`/restrictedOrderType?type=${aggType}`);
    } else {
        return api.get("/restrictedOrderType");
    }

};

export const getRestrictedOrderById = (id) => {
    return api.get(`/restrictedOrderType/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const createRestrictedOrder = (restrictedOrderData) => {
    return api.post("/restrictedOrderType", restrictedOrderData);
};

export const updateRestrictedOrder = (id, type, restrictedOrderData) => {
    // return api.patch(`/restrictedOrderType/${id}?type=${type}` , restrictedOrderData);
   return api.patch(`/restrictedOrderType/${id}`, {...restrictedOrderData,  type }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const deleteRestrictedOrder = (id) => {
    return api.delete(`/restrictedOrderType/${id}`);
};

export const filterRestrictedOrders = (filteringData) => {
    return api.post(`/restrictedOrderType/filter`, filteringData);
};

