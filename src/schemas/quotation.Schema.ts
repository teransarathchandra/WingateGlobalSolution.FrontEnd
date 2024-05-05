import * as yup from 'yup';

export const quotationYupSchema = yup.object().shape({
    packagingCost: yup.number()
        .nullable().typeError("Enter a Value")
        .required('Packaging Cost is required.')
        .min(0, 'Packaging Cost cannot be negative'),
    routeCost: yup.number()
        .nullable().typeError("Enter a Value")
        .required('Route Cost is required.')
        .min(0, 'Route Cost cannot be negative'),
    unitWeightCost: yup.number()
        .nullable().typeError("Enter a Value")
        .required('Unit Weight Cost is required.')
        .min(0, 'Unit Weight Cost cannot be negative'),
    pickUpCost: yup.number()
        .nullable().typeError("Enter a Value")
        .required('Pickup Cost is required.')
        .min(0, 'Pickup Cost cannot be negative'),
    surcharge: yup.number()
        .nullable().typeError("Enter a Value")
        .required('Surcharge Cost is required.')
        .min(0, 'Surcharge cannot be negative'),
    //fullAmount: yup.number()
});
