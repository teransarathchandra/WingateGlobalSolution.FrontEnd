import CountrySelector from '../../shared/CountrySelector'
import { Container, FlexRow, ImageContainer, PrimaryButton } from '@app_styles/shared/commonStyles.style'
import { HeaderSection } from '@app_styles/shared/headers.styles'
import TransportContainerImg from '@app_assets/images/customer/TransportContainer.png'
import ChooseDestinationImg from '@app_assets/images/customer/ChooseDestination.png'
import { getAllCountry } from "../../../services/countryService";
import { ICountry } from '@app_interfaces/ICountry';
import { useEffect, useState } from 'react'
import useSessionStorage from '@app_hooks/useSessionStorage'
import toastUtil from '@app_utils/toastUtil'

const ChooseDestination = ({ goNext }) => {

    const [countries, setCountries] = useState([]);
    const [selectedSendingCountryCode, setSelectedSendingCountryCode] = useSessionStorage('order-sending-country-code', 'LK');
    const [selectedReceivingCountryCode, setSelectedReceivingCountryCode] = useSessionStorage('order-receiving-country-code');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedSendingCountryCode) {
            toastUtil.error('Please select sending country.');
            return;
        }
        if (!selectedReceivingCountryCode) {
            toastUtil.error('Please select receiving country.');
            return;
        }
        goNext();
    };

    const fetchCountries = async () => {
        try {
            const { data } = await getAllCountry();
            const countryCodes = data.map((country: ICountry) => country.countryCode);
            setCountries(countryCodes);
        } catch (error) {
            console.error('Failed to fetch country', error);
        }
    };

    const handleCountrySelect = (code, id) => {
        console.log("Selected Country Code:", code, id);
        if (id == "sendingCountry")
            setSelectedSendingCountryCode(code);
        if (id == "receivingCountry")
            setSelectedReceivingCountryCode(code);

    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (!selectedReceivingCountryCode) {
            setSelectedReceivingCountryCode(selectedReceivingCountryCode);
        }
    }, [selectedReceivingCountryCode, setSelectedReceivingCountryCode]);

    return (
        <Container>
            <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                <HeaderSection>Choose a Destination</HeaderSection>
                <ImageContainer src={ChooseDestinationImg} alt="" width="80px" height="80px" />
            </FlexRow>
            <form onSubmit={handleSubmit}>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                    <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' flexDirection='column'>
                        <CountrySelector id={"sendingCountry"} selectedCountry={selectedSendingCountryCode} countries={["LK"]} disabled={true} onCountrySelect={handleCountrySelect} />
                        <p>From</p>
                    </FlexRow>
                    <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' flexDirection='column' padding='0.5rem 0'>
                        <CountrySelector id={"receivingCountry"} selectedCountry={selectedReceivingCountryCode} countries={countries} disabled={false} onCountrySelect={handleCountrySelect} />
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
