import api from "@app_utils/apiUtils";

export const getSubmittedDocumentById = (id) => {
    return api.get(`/submittedDocument/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getAllSubmittedDocumentByItemId = (itemId) => {
    if (itemId) {
        return api.get(`/submittedDocument/byItemId/${itemId}`)
        .then((response) => response.data)
        .catch((error) => error.message);
    } else {
        return api.get("/submittedDocument")
        .then((response) => response.data)
        .catch((error) => error.message);
    }
};
export const getSubmittedDocumentAccessibleURL = (blobName) => {
    return api.get(`/submittedDocument/getBlobSasUrl/${blobName}`)
    .then((response) => response.data)
    .catch((error) => error.message);
}
