import CommonLoading from "@app_components/loader/CommonLoading";
import PDFLayout from "@app_components/pdf/PDFLayout";
import CommercialInvoice from "@app_components/pdf/pdfTemplates/CommercialInvoice"
import PDFDownloadButton from "@app_components/shared/PDFDownloadButton"
import useSessionStorage from "@app_hooks/useSessionStorage";
import { sendEmail } from "@app_services/emailService";
import { useEffect, useState } from "react";

interface OrderData {
    order: any;
    item: any;
    receiver: any;
    sender: any;
    payment: any;
}

const PaymentConfirmation = () => {

    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [orderDetails,] = useSessionStorage('order-details');
    const [itemDetails,] = useSessionStorage('order-shipment-details');
    const [receiverDetails,] = useSessionStorage('receiver-form-data');
    const [senderDetails,] = useSessionStorage('sender-form-data');
    const [orderPaymentDetails,] = useSessionStorage('order-payment-details');

    useEffect(() => {

        if (orderDetails && itemDetails && receiverDetails && senderDetails && orderPaymentDetails) {
            setOrderData({
                order: orderDetails,
                item: itemDetails,
                receiver: receiverDetails,
                sender: senderDetails,
                payment: orderPaymentDetails
            });
            sendInvoiceEmail({
                order: orderDetails,
                item: itemDetails,
                receiver: receiverDetails,
                sender: senderDetails,
                payment: orderPaymentDetails
            });
        }
    }, [orderDetails, itemDetails, receiverDetails, senderDetails, orderPaymentDetails]);

    const sendInvoiceEmail = async (invoiceData) => {
        const emailHtmlContent = prepareEmailHtmlContent(invoiceData);
        const emailDetails = {
            toEmail: invoiceData.sender.email,
            emailSubject: `Confirmation and Invoice for Your Shipment Order #${invoiceData.order.orderId}`,
            emailBody: emailHtmlContent,
        };

        const response = await sendEmail(emailDetails);
        console.log(response.message);
    };

    const prepareEmailHtmlContent = ({ order, item, receiver, sender, payment }) => {
        return `
        <div style="font-family: 'Arial', sans-serif; max-width: 650px; margin: auto; padding: 20px 40px; border: 2px solid #0056b3; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #0056b3; text-align: center; border-bottom: 1px solid #0000001a; padding-bottom: 10px;">Shipment Confirmation</h1>
        <p style="text-align: center; font-size: 16px; color: #333;">Order ID: <strong>#${order.orderId}</strong></p>
        <p style="font-weight: bold; color: #333;">Dear ${sender.name.firstName} ${sender.name.lastName},</p>
        <p style="text-align: center; color: #555;">Thank you for choosing our services. We have received your payment and have begun processing your shipment.</p>
        
        <h2 style="color: #0056b3; margin-top: 20px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border-radius: 8px;">
            <thead>
                <tr style="background-color: #e1bd05; color: black;">
                    <th style="padding: 10px 15px; border: 1px solid #e1bd05;">Item</th>
                    <th style="padding: 10px 15px; border: 1px solid #e1bd05;">Description</th>
                    <th style="padding: 10px 15px; border: 1px solid #e1bd05; text-align: right;">Quantity</th>
                    <th style="padding: 10px 15px; border: 1px solid #e1bd05; text-align: right;">Unit Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="text-align: center; padding: 8px 15px; border: 1px solid #ddd;">${item.itemName}</td>
                    <td style="text-align: center; padding: 8px 15px; border: 1px solid #ddd;">${item.description}</td>
                    <td style="text-align: right; padding: 8px 15px; border: 1px solid #ddd;">${item.packageCount}</td>
                    <td style="text-align: right; padding: 8px 15px; border: 1px solid #ddd;">LKR ${item.itemValue.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>

        <h2 style="color: #0056b3; margin-top: 30px;">Payment Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border-radius: 8px;">
            <thead>
                <tr style="background-color: #e1bd05; color: black;">
                    <th style="padding: 10px 15px; border: 1px solid #e1bd05;">Description</th>
                    <th style="padding: 10px 15px; border: 1px solid #e1bd05; text-align: right;">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr><td style="text-align: left; padding: 8px 15px; border: 1px solid #ddd;">Payment ID</td><td style="text-align: right; padding: 8px 15px; border: 1px solid #ddd;">${payment.payment_id}</td></tr>
                <tr><td style="text-align: left; padding: 8px 15px; border: 1px solid #ddd;">Payment Method</td><td style="text-align: right; padding: 8px 15px; border: 1px solid #ddd;">${payment.payment_method.method}</td></tr>
                <tr><td style="text-align: left; padding: 8px 15px; border: 1px solid #ddd;">Card Holder</td><td style="text-align: right; padding: 8px 15px; border: 1px solid #ddd;">${payment.payment_method.card_customer_name}</td></tr>
                <tr><td style="text-align: left; padding: 8px 15px; border: 1px solid #ddd;">Card Number</td><td style="text-align: right; padding: 8px 15px; border: 1px solid #ddd;">${payment.payment_method.card_no}</td></tr>
                <tr><td style="text-align: left; padding: 8px 15px; border: 1px solid #ddd;">Amount Paid</td><td style="text-align: right; padding: 8px 15px; border: 1px solid #ddd;">${payment.amount_detail.currency} ${payment.amount}</td></tr>
            </tbody>
        </table>
    
        <h2 style="color: #0056b3; margin-top: 30px;">Sender and Receiver Details</h2>
        <div style="display: -webkit-flex; justify-content: -webkit-space-around; margin-top: 10px;">
            <div style="background-color: #f2f2f2; padding: 5px 15px; border-radius: 8px;">
                <h3 style="color: #0056b3; margin-bottom: 10px;">Sender Information</h3>
                <p><strong>Name:</strong> ${sender.name.firstName} ${sender.name.lastName}</p>
                <p><strong>Email:</strong> ${sender.email}</p>
                <p><strong>Address:</strong> ${sender.address.street}, ${sender.address.city}, ${sender.address.state}</p>
            </div>
            <div style="background-color: #f2f2f2; padding: 5px 15px; border-radius: 8px; margin-left: 100px">
                <h3 style="color: #0056b3; margin-bottom: 10px;">Receiver Information</h3>
                <p><strong>Name:</strong> ${receiver.name.firstName} ${receiver.name.lastName}</p>
                <p><strong>Email:</strong> ${receiver.email}</p>
                <p><strong>Address:</strong> ${receiver.address.street}, ${receiver.address.city}, ${receiver.address.state}</p>
            </div>
        </div>
        <div style="margin-top: 50px; text-align: center;">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent('http://localhost:5173/track-order?orderId=' + order.orderId)}" alt="QR Code" style="width: 120px; height: 120px;" />
        </div>
        <p style="text-align: center; color: #333; margin-top: 20px;">If you have any questions or need further assistance, please contact our support team.</p>
        <p style="text-align: center; color: #555; margin-top: 10px;">Thank you for trusting us with your shipment!</p>
        </div>
        `;
    };

    if (!orderData) {
        return <CommonLoading loading={true}></CommonLoading>;
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
