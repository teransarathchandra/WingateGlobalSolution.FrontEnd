import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import shipmentDetailsSchema from "@app_schemas/shipmentDetailsSchema";
import { StyledForm } from "@app_styles/shared/form.styles";
import LorryImg from '@app_assets/images/customer/Lorry.png'
import { HeadingSection } from "@app_styles/shared/heading.styles";
import {
    FieldGroup,
} from "@app_styles/signForm.styles";
import { FlexRow, ImageContainer } from "@app_styles/shared/commonStyles.style";

const ReceiverForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(shipmentDetailsSchema), // Define your validation schema
    });

    const onSubmit = (data) => {
        console.log("Shipment Data", data);
        // Handle the submission to your backend or state management
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)} width="350px">
            <HeadingSection>
                <FlexRow justifyContent='start' alignItems='center' columnGap='1rem' margin=".2rem 0">
                    <h1>Receiver</h1> <ImageContainer src={LorryImg} alt="" width="40px" height="40px" />
                </FlexRow>
            </HeadingSection>
            <FieldGroup>
                <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("itemName")}
                    error={!!errors.itemName}
                    helperText={errors.itemName?.message}
                />
            </FieldGroup>
            <FieldGroup>
                <TextField
                    label="Contact Number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
            </FieldGroup>
            <FieldGroup>
                <TextField
                    label="Email (Optional)"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
            </FieldGroup>
            <FieldGroup>
                <TextField
                    label="State"
                    select
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("category")}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                >
                    <option value="">Select a category</option>
                </TextField>
            </FieldGroup>
            <FieldGroup>
                <TextField
                    label="City"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("weight")}
                    error={!!errors.weight}
                    helperText={errors.weight?.message}
                />
            </FieldGroup>
            <FieldGroup>
                <TextField
                    label="Street"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("value")}
                    error={!!errors.value}
                    helperText={errors.value?.message}
                />
            </FieldGroup>
            <FieldGroup>
                {/* <ActionButton type="submit">Submit Details</ActionButton> */}
            </FieldGroup>
        </StyledForm>
    )
}

export default ReceiverForm