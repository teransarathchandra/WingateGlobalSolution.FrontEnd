import api from "../utils/apiUtils";

export const getAllAirlines = () => {
    return api
        .get("/airline")
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const updateAirline = (id, airlineData) => {
    console.log("new id", id);
    return api
        .put(`/airline/${id}`, {
            code: airlineData.code,
            name: airlineData.name,
        })
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const createAirline = (airlineData) => {
    return api
        .post("/airline", airlineData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const deleteAirline = (id) => {
    return api
        .delete(`/airline/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};
