import { useEffect } from "react";
import api from "@app_utils/apiUtils";

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
            const { data } = await response;
            return data.hash;
        } else {
            throw new Error('Failed to fetch hash from the backend.');
        }
    };

    // Function to initiate PayHere payment
    const initiatePayment = async () => {

        try {
            const hash = await fetchHash({
                order_id,
                amount,
                currency
            });

            const payment = {
                sandbox: true,
                merchant_id: "1225830",   //change your merchant_id
                return_url: "http://localhost:5173/order",
                cancel_url: "http://localhost:5173/order",
                notify_url: "http://localhost:5173/order", // important but need public url not local host to recive data
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
            // Start PayHere Payment
            window.payhere.startPayment(payment);

        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    window.payhere.onCompleted = function onCompleted(order_id) {
        console.log("Payment completed. OrderID:" + order_id);
        // setPaymentSuccess(true);
        // setSuccess(true); // to do changes in implement page
        // setOrderID(order_id); // to save in database
        goNext();
    };

    window.payhere.onDismissed = function onDismissed() {
        // Note: Prompt user to pay again or show an error page
        console.log("Payment dismissed");
        goBack();
    };

    window.payhere.onError = function onError(error) {
        // Note: show an error page
        console.log("Error:"  + error);
    };

    useEffect(() => {
        initiatePayment();
    }, [])

    return (
        // <div>
        //     <button onClick={initiatePayment}>Pay with PayHere</button>
        //     {paymentStatus && <p>{paymentStatus}</p>}
        // </div>
        <>
        </>
    );
};

export default Payment;