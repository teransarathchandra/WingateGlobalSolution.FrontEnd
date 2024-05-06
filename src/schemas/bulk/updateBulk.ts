import * as yup from 'yup';

export const updateBulkSchema = yup.object({
  masterAirwayBillId: yup.string().required("Master Airway Bill ID is required"),
  flightId: yup.string().required("Flight is required"),
}).required();