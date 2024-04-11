import { IApiResponse } from "@app_interfaces/IOrder";
import api from "@app_utils/apiUtils";

export const getAllOrders = () => {
    return api.get("/order")
        .then((response) => response.data)
        .catch((error) => error.message);
};
export const getAllOrderTransport = (aggType) => {
    if (aggType) {
        return api
            .get<IApiResponse>(`/order/orderTransport?type=${aggType}`)
            .then((result) => result.data)
            .catch((error) => {
                console.log(error);
            });
    } else {
        return api
            .get<IApiResponse>("/order/orderTransport")
            .then((result) => result.data)
            .catch((error) => {
                console.log(error);
            });
    }
};



export const getOrderById = (id) => {
    return api.get(`/order/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const createOrder = (orderData) => {
    return api.post("/order", orderData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const updateOrder = (id, orderData) => {
    return api.put(`/order/${id}`, orderData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const deleteOrder = (id) => {
    return api.delete(`/order/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};
