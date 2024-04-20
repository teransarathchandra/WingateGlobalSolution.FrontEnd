import { Container, FlexRow, ImageContainer, PrimaryButton } from '@app_styles/shared/commonStyles.style'
import { HeaderSection, SubHeaderSection } from '@app_styles/shared/headers.styles'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RedDeliveryLorryImg from '@app_assets/images/customer/RedDeliveryLorry.png'
import AeroplaneImg from '@app_assets/images/customer/Aeroplane.png'
import { useState } from 'react';
import { Button } from '@mui/material';
import useSessionStorage from '@app_hooks/useSessionStorage';

const DeliveryOptions = ({ goNext, goBack }) => {

  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [, setDeliveryOption] = useSessionStorage('order-delivery-option');

  const handleSubmit = (deliveryOpt) => {
    setDeliveryOption(deliveryOpt);
    goNext();
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <Container style={{ margin: '1rem 5rem 0 5rem' }}>
      <FlexRow justifyContent='center' alignItems='center' columnGap='1rem'>
        <HeaderSection>Delivery Options</HeaderSection>
        <ImageContainer src={RedDeliveryLorryImg} alt="" width="120px" height="80px" />
      </FlexRow>
      <FlexRow flexDirection='column' justifyContent='right' alignItems='flex-end' columnGap='1rem' style={{ width: '100%' }}>
          <FlexRow justifyContent='right' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Shipment Date"
                value={value}
                disablePast
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          </FlexRow>
          <FlexRow flexDirection='column' style={{ margin: '.5rem 0', padding: '1rem', border: '1px solid #204DAB', borderRadius: '5px' }}>
            <SubHeaderSection>
              Standard
            </SubHeaderSection>
            <FlexRow>
              <ImageContainer src={AeroplaneImg} alt="" width="200px" height="80px" />
              <div style={{ borderLeft: 'solid #000000', margin: '0 5px' }}>
              </div>
              <FlexRow flexDirection='column' style={{ margin: '0 1rem' }}>
                <div style={{ backgroundColor: '#FFEE95', borderRadius: '5px', width: '200px' }}>
                  <p style={{ backgroundColor: '#E1BD05', padding: '.7rem', borderRadius: '5px', textAlign: 'center' }}>
                    Estimated Delivery
                  </p>
                  <h3 style={{ padding: '.7rem', borderRadius: '5px', textAlign: 'center' }}>
                    Mon, 19 February
                  </h3>
                </div>
                <div style={{ marginTop: '0 1rem' }}>
                  <h4>
                    Book by 16/02/2024 by 5:00 pm for a pick-up today
                  </h4>
                </div>
              </FlexRow>
              <FlexRow flexDirection='column' style={{ margin: '0 1rem' }}>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem'>
                  <p>No VAT charge</p>
                  <SubHeaderSection>LKR 15,000.00*</SubHeaderSection>
                </FlexRow>
                <FlexRow>
                  <Button variant="contained" color="error" onClick={() => handleSubmit('standard')}>Continue Booking</Button>
                </FlexRow>
              </FlexRow>
              <FlexRow>
              </FlexRow>
            </FlexRow>
          </FlexRow>
          <FlexRow flexDirection='column' style={{ margin: '.5rem 0', padding: '1rem', border: '1px solid #204DAB', borderRadius: '5px' }}>
            <SubHeaderSection>
              Express
            </SubHeaderSection>
            <FlexRow>
              <ImageContainer src={AeroplaneImg} alt="" width="200px" height="80px" />
              <div style={{ borderLeft: 'solid #000000', margin: '0 5px' }}>
              </div>
              <FlexRow flexDirection='column' style={{ margin: '0 1rem' }}>
                <div style={{ backgroundColor: '#FFEE95', borderRadius: '5px', width: '200px' }}>
                  <p style={{ backgroundColor: '#E1BD05', padding: '.7rem', borderRadius: '5px', textAlign: 'center' }}>
                    Estimated Delivery
                  </p>
                  <h3 style={{ padding: '.7rem', borderRadius: '5px', textAlign: 'center' }}>
                    Mon, 19 February
                  </h3>
                </div>
                <div style={{ marginTop: '0 1rem' }}>
                  <h4>
                    Book by 16/02/2024 by 5:00 pm for a pick-up today
                  </h4>
                </div>
              </FlexRow>
              <FlexRow flexDirection='column' style={{ margin: '0 1rem' }}>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem'>
                  <p>No VAT charge</p>
                  <SubHeaderSection>LKR 25,000.00*</SubHeaderSection>
                </FlexRow>
                <FlexRow>
                  <Button variant="contained" color="error" onClick={() => handleSubmit('express')}>Continue Booking</Button>
                </FlexRow>
              </FlexRow>
              <FlexRow>
              </FlexRow>
            </FlexRow>
          </FlexRow>
          <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
            {/* <PrimaryButton type="submit" width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0">Next</PrimaryButton> */}
          </FlexRow>
      </FlexRow>
      <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
        <PrimaryButton type="button" width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" onClick={handleGoBack}>Back</PrimaryButton>
      </FlexRow>
    </Container>
  )
}

export default DeliveryOptions
