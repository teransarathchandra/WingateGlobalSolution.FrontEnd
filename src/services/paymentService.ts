import api from "../utils/apiUtils";

export const getAllPayments = (aggType) => {
    if (aggType) {
        return api.get(`/payment?type=${aggType}`)
            .then((response) => response.data)
            .catch((error) => error.message);
    } else {
        return api.get("/payment")
            .then((response) => response.data)
            .catch((error) => error.message);
    }
};

export const getPaymentById = (id) => {
    return api.get(`/payment/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const createPayment = (paymentData) => {
    return api.post("/payment", paymentData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const updatePayment = (id, paymentData) => {
    return api.put(`/payment/${id}`, paymentData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const deletePayment = (id) => {
    return api.delete(`/payment/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};
