import { StyledForm } from "@app_styles/shared/form.styles";
import { FlexRow } from "@app_styles/shared/commonStyles.style";
import FileUploader from "@app_components/shared/FileUploader";

interface RequiredDocumentsFormProps {
    trueDocumentList: string[];
    itemID: string;
  }
const RequiredDocumentsForm: React.FC<RequiredDocumentsFormProps> = ({trueDocumentList} , itemID) => {

    return (
         <StyledForm width="400px">     
            {trueDocumentList.map((docName) => (
                <FlexRow flexDirection="column" rowGap=".5rem" key={docName} margin="1rem 0">
                    <label htmlFor={docName}>{docName.split(/(?=[A-Z])/).join(" ")}</label>
                    <FileUploader
                        uploadUrl="/uploadFile"
                        folderPath={`Submitted Documents/${docName}`}
                        onUploadSuccess={(data) => console.log('Success:', data)}
                        onUploadError={(error) => console.error('Error:', error)}
                        itemID = {itemID}
                        documentType = {docName}
                    />
                </FlexRow>
            ))}
        </StyledForm>
    );
};

export default RequiredDocumentsForm;
