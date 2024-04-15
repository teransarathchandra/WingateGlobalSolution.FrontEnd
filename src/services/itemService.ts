import api from "@app_utils/apiUtils";

export const createItem = (itemData) => {
    return api.post("/item", itemData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const updateItem = (id, itemData) => {
    return api.patch(`/item/${id}`, itemData)
        .then((response) => response.data)
        .catch((error) => error.message);
};