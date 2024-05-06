import { IApiResponse } from "@app_interfaces/IBulk";
import api from "../utils/apiUtils";

export const getAllBulks = (aggType) => {
    if (aggType) {
        return api.get(`/bulk?type=${aggType}`)
        .then((response) => response.data)
        .catch((error) => error.message);
    } else {
        return api.get("/bulk")
        .then((response) => response.data)
        .catch((error) => error.message);
    }
};

export const createBulk = (bulkData) => {
    return api
        .post("/bulk", bulkData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getLastAddedBulk = (aggType) => {
    if (aggType) {
        return api
            .get<IApiResponse>(`/bulk/lastadded?type=${aggType}`)
            .then((result) => result.data)
            .catch((error) => {
                console.log(error);
            });
    } else {
        return api
            .get<IApiResponse>("/bulk/lastadded")
            .then((result) => result.data)
            .catch((error) => {
                console.log(error);
            });
    }
};

export const updateBulk = async (id, bulkData) => {
    const { data } = await api
        .patch(`/bulk/${id}`, { flightId: bulkData.flightId, masterAirwayBillId: bulkData.masterAirwayBillId, currentLocation: bulkData.currentLocation, arrivedTime: bulkData. arrivedTime, status: bulkData.status})
        .then((result) => result.data)
        .catch((error) => {
            console.log(error);
        });

    return data;
};

export const deleteBulk = (id) => {
    return api.delete(`/bulk/${id}`)
    .then((response) => response.data)
    .catch((error) => error.message);
};
