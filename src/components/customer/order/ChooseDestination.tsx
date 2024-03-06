import CountrySelector from '../../shared/CountrySelector'
import { Container, FlexRow, ImageContainer, PrimaryButton } from '../../../styles/shared/commonStyles.style'
import { HeaderSection } from '../../../styles/shared/headers.styles'
import TransportContainerImg from '../../../assets/images/customer/TransportContainer.png'
import ChooseDestinationImg from '../../../assets/images/customer/ChooseDestination.png'

const ChooseDestination = ({ goNext }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        goNext();
    };

    return (
        <Container>
            <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                <HeaderSection>Choose a Destination</HeaderSection>
                <ImageContainer src={ChooseDestinationImg} alt="" width="80px" height="80px" />
            </FlexRow>
            <form onSubmit={handleSubmit}>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                    <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' flexDirection='column'>
                        <CountrySelector selectedCountry={"LK"} countries={["LK"]} disabled={true} />
                        <p>From</p>
                    </FlexRow>
                    <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' flexDirection='column' padding='0.5rem 0'>
                        <CountrySelector selectedCountry={""} countries={["MV"]} disabled={false}/>
                        <p>To</p>
                    </FlexRow>
                </FlexRow>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                    <ImageContainer src={TransportContainerImg} alt="" width="500px" height="350px" />
                </FlexRow>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                    <PrimaryButton type="submit" width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0">Next</PrimaryButton>
                </FlexRow>
            </form>
        </Container>
    )
}

export default ChooseDestination;