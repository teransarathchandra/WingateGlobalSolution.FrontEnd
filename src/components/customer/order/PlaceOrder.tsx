import { Container, FlexRow, ImageContainer, PrimaryButton } from '@app_styles/shared/commonStyles.style'
import CargoBoxImg from '@app_assets/images/customer/CargoBox.png'
import SenderForm from '../../forms/order/SenderForm';
import ReceiverForm from '../../forms/order/ReceiverForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createSender } from '@app_services/senderService';
import { createReceiver } from '@app_services/receiverService';
import { createOrder } from '@app_services/orderService';
import useSessionStorage from '@app_hooks/useSessionStorage';

interface FormMethods {
  submitForm: () => void;
}

const PlaceOrder = ({ goNext, goBack }: { goNext: () => void, goBack: () => void }) => {

  const [itemId, ] = useSessionStorage('order-itemId');
  const [isPickupOrder, ] = useSessionStorage('order-is-pickup-order');
  const [priority, ] = useSessionStorage('order-delivery-option');

  const [senderFormValid, setSenderFormValid] = useState(false);
  const [receiverFormValid, setReceiverFormValid] = useState(false);
  const [senderData, setSenderData] = useState({});
  const [receiverData, setReceiverData] = useState({});

  const senderFormRef = useRef<FormMethods>(null);
  const receiverFormRef = useRef<FormMethods>(null);

  const handleSenderSubmit = useCallback((data, isValid) => {
    setSenderData(data);
    setSenderFormValid(isValid);
  }, []);

  const handleReceiverSubmit = useCallback((data, isValid) => {
    setReceiverData(data);
    setReceiverFormValid(isValid);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Trigger the form submissions
    senderFormRef.current?.submitForm();
    receiverFormRef.current?.submitForm();

    // setTimeout(() => {
    //   if (senderFormValid && receiverFormValid) {
    //     createSender(senderData);
    //     createReceiver(receiverData);
    //     goNext();
    //     console.log("Both forms are valid, submitting data:", { senderData, receiverData });
    //   } else {
    //     console.log("One or both forms are invalid.");
    //   }
    // }, 0);
  };

  useEffect(() => {
    const submitData = async () => {
      if (senderFormValid && receiverFormValid) {
        try {
          const senderPromise = createSender(senderData);
          const receiverPromise = createReceiver(receiverData);

          // Wait for both API calls to resolve
          const [senderResponse, receiverResponse] = await Promise.all([senderPromise, receiverPromise]);
          const senderId = senderResponse.data._id;  // Assuming response has _id
          const receiverId = receiverResponse.data._id;  // Assuming response has _id

          // Now call createOrder API
          const createOrderPayload = {
            status: 'Pending', // Assuming the initial status is "Pending"
            itemId: itemId, // Assuming packageId refers to order-itemId
            senderId: senderId, // Replace with the sender ID obtained from the API response
            receiverId: receiverId, // Replace with the receiver ID obtained from the API response
            isPickupOrder: isPickupOrder, // Convert string to boolean
            priority: priority, // Assuming this maps to "priority" in your schema
          };

          const orderResponse = await createOrder(createOrderPayload);
          console.log("Order created successfully:", orderResponse);

          // Proceed to the next step or handle success scenario
          goNext();
        } catch (error) {
          console.error("Error creating sender, receiver, or order:", error);
          // Handle error scenario
        }
      }
    };

    submitData();
  }, [senderData, receiverData, goNext, senderFormValid, receiverFormValid, itemId, isPickupOrder, priority]);

  const handleGoBack = () => {
    goBack();
  };

  return (
    <Container>
      <FlexRow justifyContent='center' alignItems='center' columnGap='3rem' padding='0.5rem 0' flexDirection='column'>
        <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
          <h1>Place Order</h1>
          <ImageContainer src={CargoBoxImg} alt="" width="80px" height="80px" />
        </FlexRow>
        <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' flexDirection='row' padding='0.5rem 0'>
          <SenderForm ref={senderFormRef} onFormSubmit={handleSenderSubmit} />
          <ReceiverForm ref={receiverFormRef} onFormSubmit={handleReceiverSubmit} />
        </FlexRow>
      </FlexRow>
      <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
      </FlexRow>
      <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
        <PrimaryButton width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0" onClick={handleGoBack}>Back</PrimaryButton>
        <PrimaryButton width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0" onClick={handleSubmit}>Pay</PrimaryButton>
      </FlexRow>
    </Container>
  )
}

export default PlaceOrder
