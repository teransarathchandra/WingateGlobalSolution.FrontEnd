import api from "@app_utils/apiUtils";

export const getSubmittedDocumentById = (id) => {
    return api.get(`/submittedDocument/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getAllSubmittedDocumentByItemId = (id, aggType) => {
    if (aggType) {
        return api.get(`/submittedDocument/${id}?type=${aggType}`)
        .then((response) => response.data)
        .catch((error) => error.message);
    } else {
        return api.get("/submittedDocument")
        .then((response) => response.data)
        .catch((error) => error.message);
    }
};