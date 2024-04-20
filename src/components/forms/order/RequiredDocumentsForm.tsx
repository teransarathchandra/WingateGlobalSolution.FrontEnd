import { StyledForm } from "@app_styles/shared/form.styles";
import { FlexRow } from "@app_styles/shared/commonStyles.style";
import FileUploader from "@app_components/shared/FileUploader";
import { useEffect, useState } from "react";

interface RequiredDocumentsFormProps {
    trueDocumentList: string[];
    itemID: string;
    onAllDocumentsUploaded: () => void; 
    handleSubmitDisability: () => void;
}
const RequiredDocumentsForm: React.FC<RequiredDocumentsFormProps> = ({ trueDocumentList, itemID, handleSubmitDisability , onAllDocumentsUploaded }) => {
    console.log('itemID', itemID)
    const [documentCount, setDocumentCount] = useState(trueDocumentList.length);
    console.log('documentCount:', documentCount);
    console.log('trueDocumentList:', trueDocumentList);
    // if (documentCount === 0) {
    //     handleSubmitDisability();
    // }
    useEffect(() => {
        // Update the documentCount whenever trueDocumentList changes
        setDocumentCount(trueDocumentList.length);

        // Check if the document count is zero and call handleSubmitDisability if so
        if (trueDocumentList.length === 0) {
            handleSubmitDisability();
        }
        if (documentCount === 0) {
            onAllDocumentsUploaded(); // Call this when all documents are uploaded
        }
    }, [trueDocumentList, handleSubmitDisability]);

    return (
        <StyledForm width="400px">
            {trueDocumentList.map((docName) => (
                <FlexRow flexDirection="column" rowGap=".5rem" key={docName} margin="1rem 0">
                    <label htmlFor={docName}>{docName.split(/(?=[A-Z])/).join(" ")}</label>
                    <FileUploader
                        uploadUrl="/submittedDocument"
                        folderPath={`Submitted Documents/${docName}`}
                        onUploadSuccess={(data) => {
                            console.log('Success:', data);
                            setDocumentCount(prevCount => prevCount - 1); // Correctly update the count
                            if (documentCount - 1 === 0) { // Check after decrement
                                onAllDocumentsUploaded(); // Notify that all documents have been uploaded
                            }
                        }}
                        onUploadError={(error) => console.error('Error:', error)}
                        itemID={itemID}
                        documentType={docName}
                    />
                </FlexRow>
            ))}
        </StyledForm>
    );
};

export default RequiredDocumentsForm;
