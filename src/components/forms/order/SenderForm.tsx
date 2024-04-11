import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import shipmentDetailsSchema from "@app_schemas/shipmentDetailsSchema";
import { StyledForm } from "@app_styles/shared/form.styles";
import ChooseDestinationImg from '@app_assets/images/customer/ChooseDestination.png'
import { HeadingSection } from "@app_styles/shared/heading.styles";
import { FlexRow, ImageContainer } from "@app_styles/shared/commonStyles.style";

const SenderForm = () => {

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
                    <h1>Sender</h1> <ImageContainer src={ChooseDestinationImg} alt="" width="40px" height="40px" />
                </FlexRow>
            </HeadingSection>
            <TextField
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                {...register("itemName")}
                error={!!errors.itemName}
                helperText={errors.itemName?.message}
                margin="dense"
            />
            <TextField
                label="Contact Number"
                variant="outlined"
                size="small"
                fullWidth
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                margin="dense"
            />
            <TextField
                label="Email (Optional)"
                variant="outlined"
                size="small"
                fullWidth
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                margin="dense"
            />
            <TextField
                label="State"
                select
                variant="outlined"
                size="small"
                fullWidth
                {...register("category")}
                error={!!errors.category}
                helperText={errors.category?.message}
                margin="dense"
            >
                <option value="">Select a category</option>
            </TextField>
            <TextField
                label="City"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                {...register("weight")}
                error={!!errors.weight}
                helperText={errors.weight?.message}
                margin="dense"
            />
            <TextField
                label="Street"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                {...register("value")}
                error={!!errors.value}
                helperText={errors.value?.message}
                margin="dense"
            />
            {/* <ActionButton type="submit">Submit Details</ActionButton> */}
        </StyledForm>
    )
}

export default SenderForm
