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

export const updateCountry = async(id, countryData) => {
    const { data } = await api
        .patch(`/country/${id}`, 
        {   countryCode: countryData.countryCode, 
            name: countryData.name, 
            currency: countryData.currency, 
            cost: countryData.cost})
        .then((result) => result.data)
        .catch((error) => {
            console.log(error);
        });

    return data;
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
