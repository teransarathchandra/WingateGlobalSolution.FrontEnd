import Payment from "@app_components/shared/Payment"
import useSessionStorage from "@app_hooks/useSessionStorage"
import { useActiveAuthContext } from "@app_contexts/authActiveContext";
// const PaymentConfirmation = ({ finishOrder, goBack }) => {
const PaymentConfirmation = ({ goNext, goBack }: { goNext: () => void, goBack: () => void }) => {

  const paymentTitle = "Wingate Global Solutions";
  const amount = 100;
  const currency = "LKR";
  
  const [orderDetails, ] = useSessionStorage('order-details');
  const {activeUser} = useActiveAuthContext();

  const customerDetails = {
    first_name: activeUser?.name?.firstName,
    last_name: activeUser?.name?.lastName,
    email: activeUser?.email,
    phone: activeUser?.contactNumber,
    address: activeUser?.address?.street,
    city: activeUser?.address?.city,
  };

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
