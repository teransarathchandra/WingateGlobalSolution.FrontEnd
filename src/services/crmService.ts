import api from "@app_utils/apiUtils";

export const getAllCustomer = () => {
    return api.get("/customer");
};

export const getCustomerById = (id) => {
    return api.get(`/customer/${id}`);
};

export const createCustomer = (CustomerData) => {
    return api.post("/customer", CustomerData);
};

export const updateCustomer = (id, CustomerData) => {
    return api.patch(`/customer/${id}`, CustomerData);
};

export const deleteCustomer = (id) => {
    return api.delete(`/customer/${id}`);
};