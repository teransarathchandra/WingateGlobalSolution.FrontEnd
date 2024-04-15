// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";// Ensure to create this schema
import { StyledForm } from "@app_styles/shared/form.styles";
import { FlexRow } from "@app_styles/shared/commonStyles.style";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { Button } from "@mui/material";
// import { requiredDocumentsSchema } from "@app_schemas/requiredDocumentsSchema";
import FileUploader from "@app_components/shared/FileUploader";

const RequiredDocumentsForm = () => {
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm({
    //     resolver: yupResolver(requiredDocumentsSchema),
    // });

    // const onSubmit = (data) => {
    //     console.log("Shipment Data", data);
    // };

    // const handleFileUpload = (event, fieldName) => {
    //     // You will need to handle file uploads here
    //     console.log(`${fieldName} file:`, event.target.files[0]);
    // };

    return (
        <StyledForm width="400px">
            {/* {["Export License", "Import Permit", "Safety Data Sheets", "Phytosanitary Certificate", "Dangerous Good Declaration"].map((docName) => (
                <FlexRow flexDirection="column" rowGap=".5rem" key={docName}>
                    <label htmlFor={docName}>{docName.split(/(?=[A-Z])/).join(" ")}</label>
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            {...register(docName)}
                            onChange={(event) => handleFileUpload(event, item)}
                        />
                        {errors[docName] && <p>{errors[docName].message}</p>}
                    </Button>
                </FlexRow>
            ))} */}
            {["Export License", "Import Permit", "Safety Data Sheets", "Phytosanitary Certificate", "Dangerous Good Declaration"].map((docName) => (
                <FlexRow flexDirection="column" rowGap=".5rem" key={docName} margin="1rem 0">
                    <label htmlFor={docName}>{docName.split(/(?=[A-Z])/).join(" ")}</label>
                    <FileUploader
                        uploadUrl="/uploadFile"
                        folderPath="restricted-order"
                        onUploadSuccess={(data) => console.log('Success:', data)}
                        onUploadError={(error) => console.error('Error:', error)}
                    />
                </FlexRow>
            ))}
        </StyledForm>
    );
};

export default RequiredDocumentsForm;
