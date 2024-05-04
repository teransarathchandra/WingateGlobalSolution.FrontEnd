import * as yup from 'yup';

export const addAirlineSchema = yup.object({
  code: yup.string().required("Code is required"),
  name: yup.string().required("Airline name  is required"),
}).required();