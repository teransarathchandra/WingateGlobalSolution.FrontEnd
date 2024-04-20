import api from "@app_utils/apiUtils";

export const getAllQuotations = () => {
    return api.get("/quotation")
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getQuotationById = (id) => {
    return api.get(`/quotation/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const createQuotation = (quotationData) => {
    return api.post("/quotation", quotationData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const updateQuotation = (id, quotationData) => {
    return api.put(`/quotation/${id}`, quotationData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const deleteQuotation = (id) => {
    return api.delete(`/quotation/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};
