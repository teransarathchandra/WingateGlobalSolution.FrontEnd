import api from "../utils/apiUtils";

export const getAllCountry = () => {
        return api.get("/country");  
};

export const getCountryById = (id) => {
    return api.get(`/country/${id}`);
};

export const createCountry = (countryData) => {
    return api.post("/country", countryData);
};

export const updateCountry = (id, countryData) => {
    return api.patch(`/country/${id}`, countryData);
};

export const deleteCountry = (id) => {
    return api.delete(`/country/${id}`);
};
