import * as Yup from 'yup';

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const editBulkSchema = Yup.object().shape({

  currentLocation: Yup.string()
    .min(2, 'Current location must be at least 2 characters long')
    .max(100, 'Current location can be no more than 100 characters long'),

  arrivedTime: Yup.string()
    .matches(timeRegex, 'Arrived time must be in the format HH:mm'),

  status: Yup.string()
    .oneOf(["In Progress", "Completed", "Manifested", "Delivered", "Departed", "In Transit"], 'Invalid status'),

  priority: Yup.string()
    .oneOf(["Standard", "Express"], 'Invalid priority'),

  destinationCountry: Yup.string(),

  category: Yup.string(),

  flightId: Yup.string(),

  masterAirwayBillId: Yup.string()
});

export default editBulkSchema;
