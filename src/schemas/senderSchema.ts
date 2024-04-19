import * as yup from "yup";

const senderDetailsSchema = yup.object().shape({
    name: yup.string().required("Sender name is required."),
    contactNumber: yup.number()
        .transform((value, originalValue) => originalValue == "" ? undefined : value)
        .required("Contact number is required.")
        .positive("Contact number must be a positive number.")
        .integer("Contact number must be an integer."),
    email: yup.string().email(),
    state: yup.string().required("State is required."),
    city: yup.string().required("Cty is required"),
    street: yup.string().required("Street is required")
});

export default senderDetailsSchema;
