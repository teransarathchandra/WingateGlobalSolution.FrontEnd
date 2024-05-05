import * as yup from "yup";

const nameRegex = /^[A-Za-z\s]+$/;

const nameSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("First name is required.")
        .min(2, "First name must be at least 2 characters.")
        .max(100, "First name must be less than 100 characters.")
        .matches(nameRegex, "First name must only contain letters."),
    lastName: yup
        .string()
        .required("Last name is required.")
        .min(2, "Last name must be at least 2 characters.")
        .max(100, "Last name must be less than 100 characters.")
        .matches(nameRegex, "Last name must only contain letters."),
});

const addressSchema = yup.object().shape({
    street: yup
        .string()
        .required("Street is required")
        .min(3, "Street must be at least 3 characters.")
        .max(50, "Street must be less than 50 characters."),
    city: yup
        .string()
        .required("City is required")
        .min(3, "City must be at least 3 characters.")
        .max(50, "City must be less than 50 characters."),
    state: yup
        .string()
        .required("State is required.")
        .min(3, "State must be at least 3 characters.")
        .max(50, "State must be less than 50 characters.")
        .typeError("Valid name must be entered for state."),
    countryId: yup
        .string()
        .required("Country is required.")
        .min(2, "Country must be at least 2 characters.")
        .max(50, "Country must be less than 50 characters."),
});

const senderDetailsSchema = yup.object().shape({
    name: nameSchema,
    address: addressSchema,
    email: yup
        .string()
        .required("Email is required")
        .email("Email must be a valid email address"),
    contactNumber: yup
        .number()
        .required("Contact number is required.")
        .positive("Contact number must be a positive number.")
        .integer("Contact number must be an integer."),
});

export default senderDetailsSchema;
