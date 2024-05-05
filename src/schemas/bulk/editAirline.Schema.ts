import * as Yup from 'yup';

const editAirlineSchema = Yup.object().shape({

  code: Yup.string()
    .required('Airline code is required')
    .min(2, 'Airline code must be at least 2 characters')
    .max(4, 'Airline code can be no more than 4 characters'),

  name: Yup.string()
    .required('Airline name is required')
    .min(5, 'Airline name must be at least 5 characters')
    .max(50, 'Airline name can be no more than 50 characters')
});

export default editAirlineSchema;
