import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "@app_styles/shared/form.styles";
import ChooseDestinationImg from '@app_assets/images/customer/ChooseDestination.png'
import { HeadingSection } from "@app_styles/shared/heading.styles";
import { FlexRow, ImageContainer } from "@app_styles/shared/commonStyles.style";
import senderDetailsSchema from "@app_schemas/senderSchema";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useSessionStorage from "@app_hooks/useSessionStorage";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useActiveAuthContext } from "@app_contexts/authActiveContext";
import CountrySelector from "@app_components/shared/CountrySelector";

interface SenderFormProps {
    onFormSubmit: (data: any, isValid: boolean) => void;
}

interface SenderFormMethods {
    submitForm: () => void;
}

const SenderForm = forwardRef<SenderFormMethods, SenderFormProps>(({ onFormSubmit }, ref) => {

    const { activeUser } = useActiveAuthContext();
    const [selectedSendingCountryCode,] = useSessionStorage('order-sending-country-code', 'LK');
    const [, setStoredData] = useSessionStorage('sender-form-data', {});
    const [isEditable, setIsEditable] = useState(false);

    const [defaultValues, setDefaultValues] = useState({
        name: {
            firstName: activeUser?.name?.firstName,
            lastName: activeUser?.name?.lastName,
        },
        address: {
            street: activeUser?.address?.street,
            city: activeUser?.address?.city,
            state: activeUser?.address?.state,
            countryId: selectedSendingCountryCode,
        },
        contactNumber: activeUser?.contactNumber,
        email: activeUser?.email,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm({
        resolver: yupResolver(senderDetailsSchema),
        mode: 'onTouched',
        defaultValues: defaultValues
    });

    const toggleEdit = () => {
        setIsEditable((prev) => !prev);
    };

    useEffect(() => {
        setIsEditable(false);
    }, []);

    useImperativeHandle(ref, () => ({
        submitForm: () => handleSubmit(onSubmit)()
    }));

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const handleCountrySelect = (code) => {
        setValue("address.countryId", code);
    };

    const onSubmit = async (data) => {
        const isValid = Object.keys(errors).length === 0;
        onFormSubmit(data, isValid);
        if (isValid) {
            setStoredData(data);
            setDefaultValues(data);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)} width="350px">
            <HeadingSection>
                <FlexRow justifyContent='start' alignItems='center' columnGap='1rem' margin=".2rem 0">
                    <h1>Sender</h1>
                    <button type="button" onClick={toggleEdit} style={{ all: 'unset' }}>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: "pointer", fontSize: "1.5rem" }} />
                    </button>
                    <ImageContainer src={ChooseDestinationImg} alt="" width="40px" height="40px" />
                </FlexRow>
            </HeadingSection>
            <TextField
                label="First Name"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                disabled={!isEditable}
                {...register("name.firstName")}
                error={!!errors.name?.firstName}
                helperText={errors.name?.firstName?.message as string}
                margin="dense"
            />
            <TextField
                label="Last Name"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                disabled={!isEditable}
                {...register("name.lastName")}
                error={!!errors.name?.lastName}
                helperText={errors.name?.lastName?.message as string}
                margin="dense"
            />
            <TextField
                label="Contact Number"
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                disabled={!isEditable}
                {...register("contactNumber", {
                    setValueAs: v => v === "" ? undefined : Number(v)
                })}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber?.message as string}
                margin="dense"
            />
            <TextField
                label="Street"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                disabled={!isEditable}
                {...register("address.street")}
                error={!!errors.address?.street}
                helperText={errors.address?.street?.message as string}
                margin="dense"
            />
            <TextField
                label="City"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                disabled={!isEditable}
                {...register("address.city")}
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message as string}
                margin="dense"
            />
            <TextField
                label="State"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                disabled={!isEditable}
                {...register("address.state")}
                error={!!errors.address?.state}
                helperText={errors.address?.state?.message as string}
                margin="dense"
            >
            </TextField>
            <Controller
                name="address.countryId"
                control={control}
                render={({ field }) => (
                    <CountrySelector
                        id={field.name}
                        selectedCountry={field.value}
                        countries={["LK"]}
                        disabled={!isEditable}
                        onCountrySelect={(code) => {
                            field.onChange(code);
                            handleCountrySelect(code);
                        }}
                    />
                )}
            />
            <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                disabled={!isEditable}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message as string}
                margin="dense"
            />
        </StyledForm>
    )
});

export default SenderForm
