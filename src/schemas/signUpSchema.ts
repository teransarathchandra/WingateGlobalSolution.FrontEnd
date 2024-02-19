import * as yup from 'yup';
import { password, name } from '../constants/regExp'

const nameSchema = yup.object().shape({
    firstName: yup.string().required('First name is required.')
        .min(5, 'First name must be at least 5 characters long.')
        .max(255, 'First name cannot be more than 255 characters long.')
        .matches(name, 'First name does not meet criteria.'),
    lastName: yup.string().required('Last name is required.')
        .min(5, 'Last name must be at least 5 characters long.')
        .max(255, 'Last name cannot be more than 255 characters long.')
        .matches(name, 'Last name does not meet criteria.'),
});

const addressSchema = yup.object().shape({
    street: yup.string().required('Street is required.')
        .min(5, 'Street must be at least 5 characters long.')
        .max(50, 'Street cannot be more than 50 characters long.'),
    city: yup.string().required('City is required.')
        .min(5, 'City must be at least 5 characters long.')
        .max(50, 'City cannot be more than 50 characters long.'),
    state: yup.string().required('State is required.')
        .min(5, 'State must be at least 5 characters long.')
        .max(50, 'State cannot be more than 50 characters long.'),
    country: yup.string().required('Country is required.')
        .min(5, 'Country must be at least 5 characters long.')
        .max(50, 'Country cannot be more than 50 characters long.'),
});

const signUpSchema = yup.object().shape({
    // employeeId: yup.number().required().integer('Employee ID must be an integer.'),
    employeeId: yup.number().integer('Employee ID must be an integer.'),
    name: nameSchema,
    address: addressSchema,
    username: yup.string(),
    email: yup.string().email('Email must be a valid email address.').required('Email is required.'),
    password: yup.string().required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .max(100, 'Password cannot be more than 100 characters long.')
        .matches(password, 'Password does not meet criteria.'),
    contactNumber: yup.number().required('Contact number is required.').integer('Contact number must be an integer.').transform((value) => Number.isNaN(value) ? null : value ),
    designationId: yup.string(),
    countryId: yup.string()
    // designationId: yup.string().required('Designation ID is required.'),
    // countryId: yup.string().required('Country ID is required.')
});

export default signUpSchema;