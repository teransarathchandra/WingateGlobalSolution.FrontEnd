import { ICountry } from "@app_interfaces/ICountry";
import api from "../utils/apiUtils";

export const getAllCountry = () => {
    return api.get<ICountry>("/country")
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getCountryById = (id) => {
    return api.get(`/country/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const createCountry = (countryData) => {
    return api.post("/country", countryData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const updateCountry = (id, countryData) => {
    return api.patch(`/country/${id}`, countryData)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const deleteCountry = (id) => {
    return api.delete(`/country/${id}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};

export const getCountryCountryCode = (countryCode) => {
    return api.get(`/country/countrycode/${countryCode}`)
        .then((response) => response.data)
        .catch((error) => error.message);
};
