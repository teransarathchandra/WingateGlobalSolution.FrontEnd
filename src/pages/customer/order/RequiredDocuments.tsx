import { Container, FlexRow, ImageContainer, PrimaryButton } from '../../../styles/shared/commonStyles.style'
import FolderImg from '../../../assets/images/customer/Folder.png'
import RequiredDocumentsForm from '../../../components/forms/order/RequiredDocumentsForm'
import { HeaderSection } from '../../../styles/shared/headers.styles'

const RequiredDocuments = () => {
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
                <PrimaryButton width="200px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="2rem 0">Send to Approval</PrimaryButton>
            </FlexRow>
        </Container>
    )
}

export default RequiredDocuments;
