import * as Yup from 'yup';

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const flightSchema = Yup.object().shape({
  flightId: Yup.string()
    .required('Flight ID is required'),

  type: Yup.string()
    .required('Type is required'),

//   routeCostPerKilo: Yup.number()
//     .typeError('Route cost per kilo must be a number')
//     .positive('Route cost per kilo must be positive')
//     .required('Route cost per kilo is required'),

  arrival: Yup.string()
    .required('Arrival is required'),

  arrivalTime: Yup.string()
    .required('Arrival time is required')
    .matches(timeRegex, 'Arrival time must be in the format HH:mm'),

  departure: Yup.string()
    .required('Departure is required'),

  departureTime: Yup.string()
    .required('Departure time is required')
    .matches(timeRegex, 'Arrival time must be in the format HH:mm'),

  AirlineId: Yup.string()
    .required('Airline ID is required')
});

export default flightSchema;
