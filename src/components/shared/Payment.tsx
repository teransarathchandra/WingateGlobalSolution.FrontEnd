import { useEffect } from "react";
import api from "@app_utils/apiUtils";
import { IPaymentDetail } from "@app_interfaces/IPaymentDetail";

const Payment = ({
    paymentTitle,
    amount,
    order_id,
    currency,
    customerDetails,
    goNext,
    goBack
}) => {

    const fetchHash = async (paymentData) => {
        const response = await api.post('/payment/generate_hash', paymentData);
        if (response) {
            const { data } = response;
            return data.hash;
        } else {
            throw new Error('Failed to fetch hash from the backend.');
        }
    };

    const initiatePayment = async () => {

        try {
            const hash = await fetchHash({
                order_id,
                amount,
                currency
            });

            const payment = {
                sandbox: true,
                merchant_id: "1225830",
                return_url: "http://localhost:5173/order",
                cancel_url: "http://localhost:5173/order",
                notify_url: "http://localhost:5173/order",
                order_id,
                items: paymentTitle,
                amount: amount,
                currency: "LKR",
                hash,
                first_name: customerDetails.firstName,
                last_name: customerDetails.lastName,
                email: customerDetails.email,
                phone: customerDetails.phone,
                address: customerDetails.address,
                city: customerDetails.city,
                country: "Sri Lanka",
            };
            console.log(payment);
            window.payhere.startPayment(payment);

        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    const getAccessToken = async () => {
        try {
            const { data } = await api.post('/payment/access-token');
            return data.accessToken;
        } catch (error) {
            console.error('Failed to retrieve access token:', error);
            throw new Error('Failed to retrieve access token');
        }
    }

    const fetchPaymentDetails = async (order_id, accessToken) => {
        try {
            const { data } = await api.get(`/payment/payment-details`,
                { params: { order_id: order_id, access_token: accessToken } }
            ).then((response) => response.data).catch((error) => error.message);

            if (Array.isArray(data) && data.length > 0) {
                const sortedPayments = data.sort((a: IPaymentDetail, b: IPaymentDetail) => new Date(b.date).getTime() - new Date(a.date).getTime());
                return sortedPayments[0];
            }
            return data;
        } catch (error) {
            console.error('Failed to retrieve access token:', error);
            throw new Error('Failed to retrieve access token');
        }
    };

    const insertPaymentDetails = async (paymentDetails) => {

        const customer = {
            firstName: paymentDetails.customer.fist_name,
            lastName: paymentDetails.customer.last_name,
            email: paymentDetails.customer.email,
            phone: paymentDetails.customer.phone,
            deliveryDetails: paymentDetails.customer.delivery_details
        };

        const amountDetail = {
            currency: paymentDetails.amount_detail.currency,
            gross: paymentDetails.amount_detail.gross,
            fee: paymentDetails.amount_detail.fee,
            net: paymentDetails.amount_detail.net,
            exchangeRate: paymentDetails.amount_detail.exchange_rate,
            exchangeFrom: paymentDetails.amount_detail.exchange_from,
            exchangeTo: paymentDetails.amount_detail.exchange_to
        };

        const paymentMethod = {
            method: paymentDetails.payment_method.method,
            cardCustomerName: paymentDetails.payment_method.card_customer_name,
            cardNo: paymentDetails.payment_method.card_no
        };

        const items = paymentDetails.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            currency: item.currency,
            unitPrice: item.unit_price,
            totalPrice: item.total_price
        }));

        const transformedPayment = {
            paymentId: paymentDetails.payment_id,
            orderId: paymentDetails.order_id,
            paymentDate: new Date(paymentDetails.date),
            description: paymentDetails.description,
            paymentStatus: paymentDetails.status,
            currency: paymentDetails.currency,
            amount: paymentDetails.amount,
            customer,
            amountDetail,
            paymentMethod,
            items,
            customFields: paymentDetails.request
        };

        try {
            const response = await api.post('/payment', transformedPayment);
            console.log('Payment Details Inserted:', response.data);
        } catch (error) {
            console.error('Failed to insert payment details:', error);
            throw error;
        }
    };

    window.payhere.onCompleted = async function onCompleted(order_id) {
        try {
            const accessToken = await getAccessToken();
            const paymentDetails = await fetchPaymentDetails(order_id, accessToken);
            console.log("Payment Details:", paymentDetails);
            await insertPaymentDetails(paymentDetails);
            goNext();
        } catch (error) {
            console.error('Error in payment process:', error);
            goBack();
        }
    };

    window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        goBack();
    };

    window.payhere.onError = function onError(error) {
        console.log("Error:" + error);
    };

    useEffect(() => {
        initiatePayment();
    }, [])

    return (
        <>
        </>
    );
};

export default Payment;