import { useNavigate } from "react-router-dom";

const useClearSessionStorage = () => {
    const navigate = useNavigate();

    const clearSessionStorage = () => {
        const keysToClear = [
            'order-item-object-id', 'order-sender-id', 'order-shipment-details',
            'order-details', 'order-receiver-id', 'sender-form-data', 'receiver-form-data',
            'order-payment-details', 'order-item-id', 'order-id', 'order-is-restricted-order',
            'current-step', 'order-item-submitted', 'order-pickup-order-date',
            'order-receiving-country-code', 'order-sending-country-code', 'order-delivery-option',
            'order-is-pickup-order', 'restricted-order-order-type',
        ];

        keysToClear.forEach(key => sessionStorage.removeItem(key));

        navigate('/order');
    };

    return clearSessionStorage;
};

export default useClearSessionStorage;