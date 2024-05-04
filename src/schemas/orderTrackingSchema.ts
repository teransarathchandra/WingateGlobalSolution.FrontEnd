import * as yup from "yup";

export const orderTrackingSchema = yup.object().shape({
    orderId: yup.string()
        .required('Order ID is required')
        .matches(/^ORD\d+$/, {
            message: 'Order ID must start with "ORD" followed by numbers',
            excludeEmptyString: true
        })
});