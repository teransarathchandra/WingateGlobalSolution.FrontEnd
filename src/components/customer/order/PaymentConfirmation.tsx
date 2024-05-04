import Payment from "@app_components/shared/Payment"
import useSessionStorage from "@app_hooks/useSessionStorage"
import { useActiveAuthContext } from "@app_contexts/authActiveContext";
import { useEffect, useState } from "react";
import { calculateQuotationAmount } from "@app_services/quotationService";
import CommonLoading from "@app_components/loader/CommonLoading";
// const PaymentConfirmation = ({ finishOrder, goBack }) => {
const PaymentConfirmation = ({ goNext, goBack }: { goNext: () => void, goBack: () => void }) => {

  const paymentTitle = "Wingate Global Solutions";
  const currency = "LKR";
  
  const [orderDetails, ] = useSessionStorage('order-details');
  const [itemId, ] = useSessionStorage('order-item-object-id');
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const {activeUser} = useActiveAuthContext();

  useEffect(() => {
    const fetchQuotation = async () => {
      if (itemId) {
        try {
          setIsLoading(true);
          const { data } = await calculateQuotationAmount(itemId);
          setAmount(data.fullAmount);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch quotation:', error);
          setIsLoading(false);
        }
      }
    };

    fetchQuotation();
  }, [itemId]);

  const customerDetails = {
    firstName: activeUser?.name?.firstName,
    lastName: activeUser?.name?.lastName,
    email: activeUser?.email,
    phone: activeUser?.contactNumber,
    address: activeUser?.address?.street,
    city: activeUser?.address?.city,
  };

  if (isLoading) {
    return <CommonLoading loading={true}></CommonLoading>
  }

  return (
    <Payment
      paymentTitle={paymentTitle}
      amount={amount}
      currency={currency}
      order_id={orderDetails?.orderId}
      customerDetails={customerDetails}
      goNext={goNext}
      goBack={goBack}
    ></Payment>
  )
}

export default PaymentConfirmation
