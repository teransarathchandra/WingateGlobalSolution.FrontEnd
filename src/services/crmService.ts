import api from "@app_utils/apiUtils";

export const getAllCustomer = () => {
    return api.get("/customer");
};

export const getCustomerById = (id) => {
    return api.get(`/customer/${id}`);
};

export const createCustomer = (CustomerData) => {
    return api.post("/customer", CustomerData)
    .then((response) => response.data)
    .catch((error) => error.message);
};

export const updateCustomer = async (id, customerData) => {
    const { data } = await api
        .patch(`/customer/${id}`, { contactNumber: customerData.contactNumber, email: customerData.email,priorityLevel:customerData.priorityLevel,birthday:customerData.birthday })
        .then((result) => result.data)
        .catch((error) => {
            console.log(error);
        });
    
    return data;
    }
export const deleteCustomer = (id) => {
    return api.delete(`/customer/${id}`);
};
