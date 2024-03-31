import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";// Ensure to create this schema
import { StyledForm } from "@app_styles/shared/form.styles";
import { FlexRow } from "@app_styles/shared/commonStyles.style";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from "@mui/material";
import { requiredDocumentsSchema } from "@app_schemas/requiredDocumentsSchema";

const RequiredDocumentsForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(requiredDocumentsSchema),
    });

    const onSubmit = (data) => {
        console.log("Shipment Data", data);
        // Handle the submission to your backend or state management
    };

    const handleFileUpload = (event, fieldName) => {
        // You will need to handle file uploads here
        console.log(`${fieldName} file:`, event.target.files[0]);
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)} width="400px">
            {["Export License", "Import Permit", "Safety Data Sheets", "Phytosanitary Certificate", "Dangerous Good Declaration"].map((docName) => (
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
            ))}
        </StyledForm>
    );
};

export default RequiredDocumentsForm;
