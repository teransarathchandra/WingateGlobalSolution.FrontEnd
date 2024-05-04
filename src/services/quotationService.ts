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

export const updateQuotation = async (id, quotationData) => {
    const { data } = await api
        .patch(`/quotation/${id}`, { packagingCost: quotationData.packagingCost, routeCost: quotationData.routeCost, unitWeightCost: quotationData.unitWeightCost, pickUpCost: quotationData.pickUpCost,surcharge: quotationData.surcharge, })
        .then((result) => result.data)
        .catch((error) => {
            console.log(error);
        });

    return data;
};


export const deleteQuotation = (id) => {
    return api.delete(`/quotation/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};
