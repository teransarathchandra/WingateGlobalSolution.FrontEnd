import api from "@app_utils/apiUtils";

export const createReceiver = (receiverData) => {
    return api.post("/receiver", receiverData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const updateReceiver = (receiverId, receiverData) => {
    return api.put(`/receiver/${receiverId}`, receiverData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getReceiverById = (id) => {
    return api.get(`/receiver/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};