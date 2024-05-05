import * as yup from 'yup';

export const quotationYupSchema = yup.object().shape({
    packagingCost: yup.number()
        .min(0, "Packaging cost cannot be negative"),
    routeCost: yup.number()
        .min(0, "Route cost cannot be negative"),
    unitWeightCost: yup.number()
        .min(0, "Unit weight cost cannot be negative"),
    pickUpCost: yup.number()
        .min(0, "Pickup cost cannot be negative"),
    surcharge: yup.number()
        .min(0, "Surcharge cannot be negative"),
    orderId: yup.string(),
    fullAmount: yup.number()
});
