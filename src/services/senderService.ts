import api from "@app_utils/apiUtils";

export const createSender = (senderData) => {
    return api.post("/sender", senderData)
        .then((response) => response.data)
        .catch((error) => error.message);
};


export const getSenderById = (id) => {
    return api.get(`/sender/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};