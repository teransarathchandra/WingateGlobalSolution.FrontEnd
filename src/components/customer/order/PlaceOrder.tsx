import { Container, FlexRow, ImageContainer, PrimaryButton } from '@app_styles/shared/commonStyles.style'
import CargoBoxImg from '@app_assets/images/customer/CargoBox.png'
import SenderForm from '../../forms/order/SenderForm';
import ReceiverForm from '../../forms/order/ReceiverForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createSender, updateSender } from '@app_services/senderService';
import { createReceiver, updateReceiver } from '@app_services/receiverService';
import { createOrder, updateOrder } from '@app_services/orderService';
import useSessionStorage from '@app_hooks/useSessionStorage';

interface FormMethods {
  submitForm: () => void;
}

const PlaceOrder = ({ goNext, goBack }: { goNext: () => void, goBack: () => void }) => {

  const [itemId, ] = useSessionStorage('order-item-object-id');
  const [isPickupOrder, ] = useSessionStorage('order-is-pickup-order');
  const [priority, ] = useSessionStorage('order-delivery-option');
  const [senderId, setSenderId] = useSessionStorage('order-sender-id');
  const [receiverId, setReceiverId] = useSessionStorage('order-receiver-id');
  const [orderId, setOrderId] = useSessionStorage('order-id');
  // const [restrictedOrder,] = useSessionStorage('order-is-restricted-order');
  const [, setOrderDetails] = useSessionStorage('order-details');
  const [senderFormValid, setSenderFormValid] = useState(false);
  const [receiverFormValid, setReceiverFormValid] = useState(false);
  const [senderData, setSenderData] = useState({});
  const [receiverData, setReceiverData] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);

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
    senderFormRef.current?.submitForm();
    receiverFormRef.current?.submitForm();
  };

  useEffect(() => {
    if (senderFormValid && receiverFormValid) {
      setSubmitClicked(true);
    }
  }, [senderFormValid, receiverFormValid]);

  useEffect(() => {
    const submitData = async () => {
      if (submitClicked) {
        try {
          let senderPromise;
          if (!senderId) {
            senderPromise = createSender(senderData);
          } else {
            senderPromise = await updateSender(senderId, senderData);
          }
          
          let receiverPromise;
          if(!receiverId) {
            receiverPromise = createReceiver(receiverData);
          } else {
            receiverPromise = await updateReceiver(receiverId, receiverData);
          }

          const [senderResponse, receiverResponse] = await Promise.all([senderPromise, receiverPromise]);
          const senderObjId = senderResponse.data._id;
          setSenderId(senderObjId);
          const receiverObjId = receiverResponse.data._id;
          setReceiverId(receiverObjId);

          const createOrderPayload = {
            // status: restrictedOrder == true ? 'Pending' : 'Processing',
            status: 'Pending',
            itemId: itemId,
            senderId: senderObjId,
            receiverId: receiverObjId,
            isPickupOrder: isPickupOrder,
            priority: priority,
          };

          let orderResponse;
          if (!orderId) {
            orderResponse = await createOrder(createOrderPayload);
          } else {
            orderResponse = await updateOrder(orderId, createOrderPayload);
          }

          if (orderResponse) {
            const orderObjId = orderResponse.data._id;
            setOrderDetails(orderResponse.data)
            setOrderId(orderObjId)
          }

          goNext();
        } catch (error) {
          console.error("Error creating sender, receiver, or order:", error);
        } finally {
          setSubmitClicked(false);
        }
      }
    };

    submitData();
  }, [submitClicked]);

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
