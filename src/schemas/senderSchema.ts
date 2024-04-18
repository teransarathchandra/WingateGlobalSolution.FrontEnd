import * as yup from "yup";

const nameSchema = yup.object().shape({
    firstName: yup.string().required("First name is required.").min(2).max(255),
    lastName: yup.string().required("Last name is required.").min(2).max(255),
});

const addressSchema = yup.object().shape({
    street: yup.string().required("Street is required").max(50).min(5),
    city: yup.string().required("City is required").max(50).min(5),
    state: yup.string().required("State is required.").max(50).min(5),
    countryId: yup.string().required("Country is required.").max(50).min(2),
});

const senderDetailsSchema = yup.object().shape({
    name: nameSchema,
    address: addressSchema,
    email: yup.string().required("Email is required").email("Email must be a valid email address"),
    contactNumber: yup.number()
        .required("Contact number is required.")
        .positive("Contact number must be a positive number.")
        .integer("Contact number must be an integer."),
    // orderId: yup.string(),
    // country: yup.string().required("Country is required.").max(50).min(2),
});

export default senderDetailsSchema;
