import { Container, FlexRow, ImageContainer, PrimaryButton } from '@app_styles/shared/commonStyles.style'
import FolderImg from '@app_assets/images/customer/Folder.png'
import RequiredDocumentsForm from '../../forms/order/RequiredDocumentsForm'
import { HeaderSection } from '@app_styles/shared/headers.styles'
import RestrictedNoticeDialog from '../order/RestrictedNoticeDialog'
import { useEffect, useState } from 'react'
import useSessionStorage from '@app_hooks/useSessionStorage'

interface RestrictedOrderFormat {
    key;
    label: string;
    type: 'string' | 'number' | 'boolean';
    value: '' | null | false | true;
}

const RequiredDocuments = ({ goNext, goBack }) => {
    const [itemObjectId,] = useSessionStorage('order-item-object-id');
    const [restrictedOrderType,] = useSessionStorage('restricted-order-order-type');
    const [isRestrictedNoticeDialogOpen, setIsRestrictedNoticeDialogOpen] = useState(true);
    const [requiredTrueDocuments, setRequiredTrueDocuments] = useState<string[]>([]);
    const itemId = itemObjectId;
    const handleSubmit = (event) => {
        event.preventDefault();
        goNext();
    };

    const handleGoBack = () => {
        goBack();
    };

    const handleProceed = () => {
        setIsRestrictedNoticeDialogOpen(false)
    };

    useEffect(() => {
        const restrictedOrder: RestrictedOrderFormat[] = [
            { key: 'exportLicense', label: 'Export License', type: 'boolean', value: restrictedOrderType.exportLicense },
            { key: 'importPermit', label: 'Import Permit', type: 'boolean', value: restrictedOrderType.importPermit },
            { key: 'safetyDataSheets', label: 'Safety Data Sheets', type: 'boolean', value: restrictedOrderType.safetyDataSheets },
            { key: 'phytosanitaryCertificate', label: 'Phytosanitary Certificate', type: 'boolean', value: restrictedOrderType.phytosanitaryCertificate },
            { key: 'dangerousGoodsDeclaration', label: 'Dangerous Goods Declaration', type: 'boolean', value: restrictedOrderType.dangerousGoodsDeclaration },
        ];

        const trueDocs = restrictedOrder
            .filter(field => field.type === "boolean" && field.value === true)
            .map(doc => doc.label);

        setRequiredTrueDocuments(trueDocs);

    }, [restrictedOrderType]);


    return (
        <>
            <Container>

                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                    <HeaderSection>Provide Required Documents</HeaderSection>
                    <ImageContainer src={FolderImg} alt="" width="40px" height="40px" />
                </FlexRow>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                    <RequiredDocumentsForm
                        trueDocumentList={requiredTrueDocuments}
                        itemID={itemId} />
                </FlexRow>
                <FlexRow justifyContent='center' alignItems='center' columnGap='1rem' padding='0.5rem 0'>
                    <PrimaryButton width="100px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="1rem 0" onClick={handleGoBack}>Back</PrimaryButton>
                    <PrimaryButton width="200px" fontSize="1rem" padding=".5rem 2rem" borderRadius="5px" margin="2rem 0" onClick={handleSubmit}>Send to Approval</PrimaryButton>
                </FlexRow>
            </Container>

            {isRestrictedNoticeDialogOpen == true &&
                <RestrictedNoticeDialog
                    isOpen={true}
                    handleBack={handleGoBack}
                    handleProceed={handleProceed}
                    trueDocumentList={requiredTrueDocuments}
                    maxQuantity={restrictedOrderType.maxQuantity}
                />
            }
        </>

    )
}

export default RequiredDocuments;
