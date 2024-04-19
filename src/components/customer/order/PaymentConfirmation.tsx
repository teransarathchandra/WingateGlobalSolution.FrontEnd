import Payment from "@app_components/shared/Payment"
import useSessionStorage from "@app_hooks/useSessionStorage"

// const PaymentConfirmation = ({ finishOrder, goBack }) => {
const PaymentConfirmation = ({ goNext, goBack }: { goNext: () => void, goBack: () => void }) => {

  const paymentTitle = "Wingate Global Solutions";
  const amount = 100;
  const currency = "LKR";
  
  const [orderDetails, ] = useSessionStorage('order-details');
  const [user, ] = useSessionStorage('app-user');

  const customerDetails = {
    first_name: user.name?.firstName,
    last_name: user?.name?.lastName,
    email: user?.email,
    phone: user?.phone,
    address: user?.address?.street,
    city: user?.address?.city,
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
