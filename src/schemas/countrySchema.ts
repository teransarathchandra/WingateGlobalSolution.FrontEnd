import * as yup from 'yup';

const countrySchema = yup.object().shape({
    countryCode: yup.string()
        .required('Country code is required.')
        .min(2, 'Country code must be at least 2 characters long.')
        .max(5, 'Country code can be no more than 5 characters long.'),
    name: yup.string()
        .required('Country name is required.')
        .min(1, 'Country name must be at least 1 character long.')
        .max(255, 'Country name can be no more than 255 characters long.'),
    currency: yup.string()
        .required('Currency is required.')
        .min(1, 'Currency must be at least 1 character long.')
        .max(5, 'Currency can be no more than 5 characters long.'),
});

export default countrySchema;
