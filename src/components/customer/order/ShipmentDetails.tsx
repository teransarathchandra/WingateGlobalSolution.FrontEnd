import { Container, FlexRow, ImageContainer, PrimaryButton } from '@app_styles/shared/commonStyles.style'
import SupplyChain from '@app_assets/images/customer/SupplyChain.png'
import ShipmentDetailsForm from '../../forms/order/ShipmentDetailsForm'

const ShipmentDetails = ({ goNext, goBack }) => {


    const handleSubmit = (event) => {
        event.preventDefault();
        retrieveSessionStorageValues();
        //api call response boolean value)
        //if condition check
        //if true show the dialog else goNext
        goNext();
    };

    const handleGoBack = () => {
        // Validate and process form, then... 
        goBack();
    };


    function getSessionStorageItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    // Function to handle the button click
    const retrieveSessionStorageValues = () => {
        const receivingCode = getSessionStorageItem('order-receiving-country-code');
        const sendingCode = getSessionStorageItem('order-sending-country-code');
        const categoryValue = getSessionStorageItem('order-category');
        debugger;
        console.log("Retrieved Values:", { receivingCode, sendingCode, categoryValue });
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
