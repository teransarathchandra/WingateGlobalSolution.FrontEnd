import { Container, FlexRow, ImageContainer, PrimaryButton } from '../../../styles/shared/commonStyles.style'
import CargoBoxImg from '../../../assets/images/customer/CargoBox.png'
import SenderForm from '../../forms/order/SenderForm';
import ReceiverForm from '../../forms/order/ReceiverForm';

const PlaceOrder = ({ goNext, goBack }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    goNext();
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
          <SenderForm />
          <ReceiverForm />
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
