import { Container, FlexRow, ImageContainer, PrimaryButton } from '@app_styles/shared/commonStyles.style'
import CargoBoxImg from '@app_assets/images/customer/CargoBox.png'
import SenderForm from '../../forms/order/SenderForm';
import ReceiverForm from '../../forms/order/ReceiverForm';
import { useCallback, useRef, useState } from 'react';

interface FormMethods {
  submitForm: () => void;
}

const PlaceOrder = ({ goNext, goBack }: { goNext: () => void, goBack: () => void }) => {

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

    // Additional validation could be placed here if necessary
    setTimeout(() => { // Using setTimeout to allow state updates to propagate
      if (senderFormValid && receiverFormValid) {
        goNext();
        console.log("Both forms are valid, submitting data:", { senderData, receiverData });
        // API call to submit senderData and receiverData
      } else {
        console.log("One or both forms are invalid.");
        // Handle invalid forms, perhaps notify user to correct the errors
      }
    }, 0);
  };

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
