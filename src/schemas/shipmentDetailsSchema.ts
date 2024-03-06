import * as yup from "yup";

const shipmentDetailsSchema = yup.object().shape({
  itemName: yup.string().required("Item name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  weight: yup
    .number()
    .required("Weight is required")
    .positive("Weight must be a positive number")
    .integer("Weight must be an integer"),
  value: yup
    .number()
    .required("Value is required")
    .positive("Value must be a positive number"),
});

export default shipmentDetailsSchema;
