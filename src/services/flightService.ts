import api from "../utils/apiUtils";

export const getAllFlights = (aggFlight) => {
    if (aggFlight) {
        return api
            .get(`/flight?type=${aggFlight}`)
            .then((response) => response.data)
            .catch((error) => error.message);
    } else {
        return api
            .get("/flight")
            .then((response) => response.data)
            .catch((error) => error.message);
    }
};

export const createFlight = (flightData) => {
    return api
        .post("/flight", flightData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const updateFlight = (id, flightData) => {
    console.log("new id", id);
    return api.put(`/flight/${id}`, {
        arrivalTime: flightData.arrivalTime,
        departureTime: flightData.departureTime,
        routeCostPerKilo: flightData.routeCostPerKilo,
    });
};

export const deleteFlight = (id) => {
    return api
        .delete(`/flight/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};
