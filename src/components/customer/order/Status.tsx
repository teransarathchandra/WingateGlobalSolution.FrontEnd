import PDFLayout from "@app_components/pdf/PDFLayout";
import CommercialInvoice from "@app_components/pdf/pdfTemplates/CommercialInvoice"
import PDFDownloadButton from "@app_components/shared/PDFDownloadButton"
import useSessionStorage from "@app_hooks/useSessionStorage";
import { useEffect, useState } from "react";

interface OrderData {
    order: any; // Replace 'any' with the actual type expected
    item: any;
    receiver: any;
    sender: any;
}

const PaymentConfirmation = ({ goNext, goBack }: { goNext: () => void, goBack: () => void }) => {

    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [orderDetails,] = useSessionStorage('order-details');
    const [itemDetails,] = useSessionStorage('order-shipment-details');
    const [receiverDetails,] = useSessionStorage('receiver-form-data');
    const [senderDetails,] = useSessionStorage('sender-form-data');

    useEffect(() => {

        if (orderDetails && itemDetails && receiverDetails && senderDetails) {
            setOrderData({
                order: orderDetails,
                item: itemDetails,
                receiver: receiverDetails,
                sender: senderDetails,
            });
        }
    }, [orderDetails, itemDetails, receiverDetails, senderDetails]);

    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <PDFLayout content={<CommercialInvoice {...orderData} />} />
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                <PDFDownloadButton content={<CommercialInvoice {...orderData} />} typeName={'Order'} id={orderData.order.orderId} />
            </div>
        </div>
    )
}

export default PaymentConfirmation
