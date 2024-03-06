import { Container, FlexRow, ImageContainer, PrimaryButton } from '../../../styles/shared/commonStyles.style'
import SupplyChain from '../../../assets/images/customer/SupplyChain.png'
import ShipmentDetailsForm from '../../forms/order/ShipmentDetailsForm'

const ShipmentDetails = ({ goNext, goBack }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        goNext();
    };

    const handleGoBack = () => {
        // Validate and process form, then...
        goBack();
    };

    return (
        <Container>
            <FlexRow justifyContent='center' alignItems='center' columnGap='3rem' padding='0.5rem 0'>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' flexDirection='column'>
                    <ImageContainer src={SupplyChain} alt='' width="350px" height="500px" />
                </FlexRow>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' flexDirection='column' padding='0.5rem 0'>
                    <ShipmentDetailsForm />
                </FlexRow>
            </FlexRow>
            <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
            </FlexRow>
            <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                <PrimaryButton width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0" onClick={handleGoBack}>Back</PrimaryButton>
                <PrimaryButton width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0" onClick={handleSubmit}>Next</PrimaryButton>
            </FlexRow>
        </Container>
    )
}

export default ShipmentDetails;