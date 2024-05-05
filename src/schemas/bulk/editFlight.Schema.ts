import * as Yup from 'yup';

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const editFlightSchema = Yup.object().shape({
    
    arrivalTime: Yup.string()
    .matches(timeRegex, 'Arrival time must be in the format HH:mm'),

  departureTime: Yup.string()
    .matches(timeRegex, 'Arrival time must be in the format HH:mm'),

});

export default editFlightSchema;
