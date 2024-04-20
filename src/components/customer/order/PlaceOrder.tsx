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
  const [, setOrderDetails] = useSessionStorage('order-details');

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

          const [senderResponse, receiverResponse] = await Promise.all([senderPromise, receiverPromise]);
          const senderId = senderResponse.data._id;
          const receiverId = receiverResponse.data._id;

          const createOrderPayload = {
            status: 'Processing',
            itemId: itemId,
            senderId: senderId,
            receiverId: receiverId,
            isPickupOrder: isPickupOrder,
            priority: priority,
          };

          const orderResponse = await createOrder(createOrderPayload);
          setOrderDetails(orderResponse.data);

          goNext();
        } catch (error) {
          console.error("Error creating sender, receiver, or order:", error);
        }
      }
    };

    submitData();
  }, [senderFormValid, receiverFormValid, goNext ]);

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
