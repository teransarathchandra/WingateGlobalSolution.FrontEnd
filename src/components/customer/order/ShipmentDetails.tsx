import { Container, FlexRow, ImageContainer, PrimaryButton } from '@app_styles/shared/commonStyles.style'
import SupplyChain from '@app_assets/images/customer/SupplyChain.png'
import ShipmentDetailsForm from '../../forms/order/ShipmentDetailsForm'
import useSessionStorage from '@app_hooks/useSessionStorage'

const ShipmentDetails = ({ goNext, goBack }) => {

    const [selectedCountryCode, setSelectedCountryCode] = useSessionStorage('order-country-code')

    const handleSubmit = (event) => {
        event.preventDefault();
        //api call response boolean value)
        //if condition check
        //if true show the dialog else goNext
        goNext();
    };

    const handleGoBack = () => {
        // Validate and process form, then... 
        goBack();
    };
    
    console.log('selectedCountryCode', selectedCountryCode)

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
