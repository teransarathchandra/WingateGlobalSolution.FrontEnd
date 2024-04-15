import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "@app_styles/shared/form.styles";
import LorryImg from '@app_assets/images/customer/Lorry.png'
import { HeadingSection } from "@app_styles/shared/heading.styles";
import { FlexRow, ImageContainer } from "@app_styles/shared/commonStyles.style";
import { forwardRef, useImperativeHandle } from "react";
import receiverDetailsSchema from "@app_schemas/receiverSchema";

interface ReceiverFormProps {
    onFormSubmit: (data: any, isValid: boolean) => void;
}

interface ReceiverFormMethods {
    submitForm: () => void;
}

const ReceiverForm = forwardRef<ReceiverFormMethods, ReceiverFormProps>(({ onFormSubmit }, ref) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(receiverDetailsSchema),
        mode: 'onTouched',
    });

    useImperativeHandle(ref, () => ({
        submitForm: () => handleSubmit(onSubmit)()
    }));

    const onSubmit = async (data) => {
        const isValid = Object.keys(errors).length === 0;
        onFormSubmit(data, isValid);
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)} width="350px">
            <HeadingSection>
                <FlexRow justifyContent='start' alignItems='center' columnGap='1rem' margin=".2rem 0">
                    <h1>Receiver</h1> <ImageContainer src={LorryImg} alt="" width="40px" height="40px" />
                </FlexRow>
            </HeadingSection>
            <TextField
                label="Name"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message as string}
                margin="dense"
            />
            <TextField
                label="Contact Number"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                {...register("contactNumber")}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber?.message as string}
                margin="dense"
            />
            <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message as string}
                margin="dense"
            />
            <TextField
                label="State"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                {...register("state")}
                error={!!errors.state}
                helperText={errors.state?.message as string}
                margin="dense"
            >
            </TextField>
            <TextField
                label="City"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message as string}
                margin="dense"
            />
            <TextField
                label="Street"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                {...register("street")}
                error={!!errors.street}
                helperText={errors.street?.message as string}
                margin="dense"
            />
        </StyledForm>
    )
});

export default ReceiverForm