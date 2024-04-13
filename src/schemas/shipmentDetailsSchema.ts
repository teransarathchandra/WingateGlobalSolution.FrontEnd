import * as yup from "yup";

const shipmentDetailsSchema = yup.object().shape({
  itemName: yup.string().required("Item name is required."),
  description: yup.string().required("Please provide a description of the item."),
  categoryId: yup.string().required("Please select a category."),
  packageTypeId: yup.string().required("Please select a package type."),
  packageCount: yup.number()
    .transform((value, originalValue) => originalValue == "" ? undefined : value)
    .required("Package count is required.")
    .positive("Package count must be a positive number.")
    .integer("Package count must be an integer."),
  weight: yup.number()
    .transform((value, originalValue) => originalValue == "" ? undefined : value)
    .required("Weight is required.")
    .positive("Weight must be a positive number.")
    .integer("Weight must be an integer."),
  itemValue: yup.number()
    .transform((value, originalValue) => originalValue == "" ? undefined : value)
    .required("Monetary value is required.")
    .positive("Item Value must be a positive number."),
  isPickupOrder: yup.boolean().required(),
  pickupOrderDate: yup.date()
  .nullable()
  .when("isPickupOrder", {
    is: true, // Strictly check that the value is true
    then: schema => schema.required("Pickup date is required when pickup order is selected."),
    otherwise: schema => schema.nullable()
  })
});

export default shipmentDetailsSchema;
