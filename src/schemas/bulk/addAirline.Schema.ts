import * as yup from 'yup';

export const addAirlineSchema = yup.object({
  code: yup.string().required("Airline code is required"),
  name: yup.string().required("Airline name  is required"),
}).required();