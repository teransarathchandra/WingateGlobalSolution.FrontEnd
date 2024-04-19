import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "@app_styles/shared/form.styles";
import LorryImg from '@app_assets/images/customer/Lorry.png'
import { HeadingSection } from "@app_styles/shared/heading.styles";
import { FlexRow, ImageContainer } from "@app_styles/shared/commonStyles.style";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import receiverDetailsSchema from "@app_schemas/receiverSchema";
import CountrySelector from "@app_components/shared/CountrySelector";
// import { getAllCountry } from "@app_services/countryService";
// import { ICountry } from "@app_interfaces/ICountry";
import useSessionStorage from "@app_hooks/useSessionStorage";

interface ReceiverFormProps {
    onFormSubmit: (data: any, isValid: boolean) => void;
}

interface ReceiverFormMethods {
    submitForm: () => void;
}

interface Address {
    street: string;
    city: string;
    state: string;
    countryId: string;
}

interface Name {
    firstName: string;
    lastName: string;
}

interface ReceiverFormData {
    name: Name;
    contactNumber: number;
    address: Address;
    email: string;
}

const ReceiverForm = forwardRef<ReceiverFormMethods, ReceiverFormProps>(({ onFormSubmit }, ref) => {

    // const [countries, setCountries] = useState([]);
    const [selectedReceivingCountryCode,] = useSessionStorage('order-receiving-country-code');
    const [storedData, setStoredData] = useSessionStorage('receiver-form-data', {});

    const defaultValues = {
        name: {
            firstName: storedData?.name?.firstName,
            lastName: storedData?.name?.lastName,
        }, address: {
            state: storedData?.address?.state,
            city: storedData?.address?.city,
            street: storedData?.address?.street,
            countryId: selectedReceivingCountryCode
        },
        contactNumber: storedData?.contactNumber,
        email: storedData?.email,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset,
    } = useForm<ReceiverFormData>({
        resolver: yupResolver(receiverDetailsSchema),
        mode: 'onTouched',
        defaultValues: defaultValues
    });

    useImperativeHandle(ref, () => ({
        submitForm: () => handleSubmit(onSubmit)()
    }));

    // const fetchCountries = async () => {
    //     try {
    //         const { data } = await getAllCountry();
    //         const countryCodes = data.map((country: ICountry) => country.countryCode);
    //         setCountries(countryCodes);
    //     } catch (error) {
    //         console.error('Failed to fetch country', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchCountries();
    // }, []);

    useEffect(() => {
        if (storedData) {
            reset(storedData);
        }
    }, [storedData, reset]);

    const handleCountrySelect = (code) => {
        setValue("address.countryId", code); // Manually set the value of countryId in the form
    };

    const onSubmit = async (data) => {
        const isValid = Object.keys(errors).length === 0;
        onFormSubmit(data, isValid);
        if (isValid) {
            setStoredData(data);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)} width="350px">
            <HeadingSection>
                <FlexRow justifyContent='start' alignItems='center' columnGap='1rem' margin=".2rem 0">
                    <h1>Receiver</h1> <ImageContainer src={LorryImg} alt="" width="40px" height="40px" />
                </FlexRow>
            </HeadingSection>
            <TextField
                label="First Name"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
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
                        countries={[field.value]}
                        disabled={false}
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
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message as string}
                margin="dense"
            />
        </StyledForm>
    )
});

export default ReceiverForm