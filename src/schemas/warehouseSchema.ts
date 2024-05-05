import * as yup from 'yup';

export const warehouseSchema = yup.object({
  warehouseId: yup.string().required("Warehouse ID is required"),
  storageCapacity: yup.number().required("Storage capacity is required").positive("Storage capacity must be a positive number").integer("Storage capacity must be an integer"),
  availability: yup.boolean().required("Availability is required"),
  location: yup.string().required("Location is required").min(10, "Location must be at least 10 characters").max(255, "Location must be at most 255 characters"),
}).required();
