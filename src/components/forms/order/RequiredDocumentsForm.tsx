import { StyledForm } from "@app_styles/shared/form.styles";
import { FlexRow } from "@app_styles/shared/commonStyles.style";
import FileUploader from "@app_components/shared/FileUploader";
import { useEffect, useState } from "react";

interface RequiredDocumentsFormProps {
    trueDocumentList: string[];
    itemID: string;
    onAllDocumentsUploaded: (boolean) => void; 
    handleSubmitDisability: () => void;
}
const RequiredDocumentsForm: React.FC<RequiredDocumentsFormProps> = ({ trueDocumentList, itemID, handleSubmitDisability , onAllDocumentsUploaded }) => {
    
    const [documentCount, setDocumentCount] = useState(trueDocumentList.length);
    
    console.log('itemID', itemID)
    console.log('documentCount:', documentCount);
    console.log('trueDocumentList:', trueDocumentList);

    useEffect(() => {
        // Update documentCount when trueDocumentList changes
        setDocumentCount(trueDocumentList.length);

        // Check if the document count is zero and call handleSubmitDisability if so
        if (trueDocumentList.length === 0) {
            handleSubmitDisability();
        }
        if (documentCount === 0) {
            onAllDocumentsUploaded(true); // Call this when all documents are uploaded
            console.log("isSendToApprovalButtonEnable in if doc =0 ")
        }else{
             onAllDocumentsUploaded(false);
        }

    }, [documentCount]);

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
                            setDocumentCount(documentCount - 1); // Correctly update the count
                            // if (documentCount - 1 === 0) { // Check after decrement
                            //     onAllDocumentsUploaded(); // Notify that all documents have been uploaded
                            // }
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
