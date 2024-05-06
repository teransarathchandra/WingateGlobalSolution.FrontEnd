import api from "../utils/apiUtils";

export const getAllCategory = () => {
    return api.get("/category")
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getCategoryById = (id) => {
    return api.get(`/category/${id}`);
};

export const createCategory = (categoryData) => {
    return api.post("/category", categoryData);
};

export const updateCategory = (id, categoryData) => {
    return api.patch(`/category/${id}`, categoryData);
};

export const deleteCategory = (id) => {
    return api.delete(`/category/${id}`);
};
