import { Container, FlexRow, ImageContainer, PrimaryButton } from '../../../styles/shared/commonStyles.style'
import FolderImg from '../../../assets/images/customer/Folder.png'
import RequiredDocumentsForm from '../../forms/order/RequiredDocumentsForm'
import { HeaderSection } from '../../../styles/shared/headers.styles'

const RequiredDocuments = ({ goNext, goBack }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        goNext();
    };

    const handleGoBack = () => {
        goBack();
    };

    return (
        <Container>
            <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                <HeaderSection>Provide Required Documents</HeaderSection>
                <ImageContainer src={FolderImg} alt="" width="40px" height="40px" />
            </FlexRow>
            <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                <RequiredDocumentsForm />
            </FlexRow>
            <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
            <PrimaryButton width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0" onClick={handleGoBack}>Back</PrimaryButton>
                <PrimaryButton width="200px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="2rem 0" onClick={handleSubmit}>Send to Approval</PrimaryButton>
            </FlexRow>
        </Container>
    )
}

export default RequiredDocuments;