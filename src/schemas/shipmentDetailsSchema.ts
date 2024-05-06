import * as yup from "yup";

const textWithLettersRequiredRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s]*$/;

const shipmentDetailsSchema = yup.object().shape({
  itemName: yup.string().required("Item name is required.")
    .min(3, "Item name must be at least 3 characters long.")
    .max(100, "Item name must not exceed 100 characters.")
    .matches(textWithLettersRequiredRegex, "Item name must include letters to identify the item properly"),
  description: yup.string().required("Please provide a description of the item.")
    .min(3, "Description must be at least 3 characters long.")
    .max(500, "Description must not exceed 500 characters.")
    .matches(textWithLettersRequiredRegex, "Description must include letters to identify the item properly"),
  categoryId: yup.string().required("Please select a category.").length(24),
  packageTypeId: yup.string().required("Please select a package type.").length(24),
  packageCount: yup.number()
    .transform((value, originalValue) => originalValue == "" ? undefined : value)
    .required("Package count is required.")
    .positive("Package count must be a positive number.")
    .integer("Package count must be an integer.")
    .min(1, "At least one package is required.")
    .max(10000, "Package count must not exceed 10,000.")
    .typeError("A valid number must be entered for package count."),
  weight: yup.number()
    .transform((value, originalValue) => originalValue == "" ? undefined : value)
    .required("Weight is required.")
    .positive("Weight must be a positive number.")
    // .integer("Weight must be an integer.")
    .min(0.1, "Weight must be at least 0.1 kg.")
    .max(10000, "Weight must not exceed 10,000 kg.")
    .typeError("A valid number must be entered for weight."),
  itemValue: yup.number()
    .transform((value, originalValue) => originalValue == "" ? undefined : value)
    .required("Item value is required.")
    .positive("Item value must be a positive number.")
    .min(100, "Item value must be at least LKR 100.")
    .max(100000000, "Item value must not exceed LKR 100,000,000.")
    .typeError("A valid number must be entered for item value."),
  isPickupOrder: yup.boolean().required("Pickup order status must be specified."),
  pickupOrderDate: yup.date()
    .nullable()
    .when("isPickupOrder", {
      is: true,
      then: schema => schema.required("Pickup date is required when pickup order is selected."),
      otherwise: schema => schema.nullable()
    })
    .typeError("A valid date must be entered for the pickup order date.")
});

export default shipmentDetailsSchema;
