import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "@app_schemas/signUpSchema";
import { StyledForm } from "@app_styles/shared/form.styles";
import { HeadingSection } from "@app_styles/shared/heading.styles";
import {
  SignSection,
  FlexRow,
  FieldGroup,
  SignButton,
  AccountOption,
  HaveAccountButton,
} from "@app_styles/signForm.styles";
import useAuth from "@app_hooks/useAuth";
import SignUpFormData from "@app_interfaces/ISignUp";

const SignUp = ({ onSignUpClick }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(signUpSchema) });

  const { registerUser, authError } = useAuth();

  const onSubmit = (data: SignUpFormData) => {
    console.log("data", data);
    registerUser(data);
  };

  useEffect(() => {
    if (authError) {
      Object.keys(authError).forEach((field) => {
        setError(field as keyof SignUpFormData, {
          type: "server",
          message: authError[field],
        });
      });
    }
  }, [authError, setError]);

  return (
    <>
      <SignSection>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <HeadingSection>
            <h1>Welcome!</h1>
            <p>Welcome! Please enter your details.</p>
          </HeadingSection>
          <FlexRow>
            <TextField
              label="First Name"
              defaultValue=""
              size="small"
              placeholder="John"
              fullWidth
              {...register("name.firstName")}
              error={!!errors.name?.firstName}
              helperText={errors.name?.firstName?.message}
            />
            <TextField
              label="Last Name"
              defaultValue=""
              size="small"
              placeholder="Smith"
              fullWidth
              {...register("name.lastName")}
              error={!!errors.name?.lastName}
              helperText={errors.name?.lastName?.message}
            />
          </FlexRow>
          <FlexRow>
            <TextField
              label="Street"
              defaultValue=""
              size="small"
              placeholder="1st Street"
              fullWidth
              {...register("address.street")}
              error={!!errors.address?.street}
              helperText={errors.address?.street?.message}
            />
            <TextField
              label="City"
              defaultValue=""
              size="small"
              placeholder="Dehiwala"
              fullWidth
              {...register("address.city")}
              error={!!errors.address?.city}
              helperText={errors.address?.city?.message}
            />
          </FlexRow>
          <FlexRow>
            <TextField
              label="State"
              defaultValue=""
              size="small"
              placeholder="Colombo"
              fullWidth
              {...register("address.state")}
              error={!!errors.address?.state}
              helperText={errors.address?.state?.message}
            />
            <TextField
              label="Country"
              defaultValue=""
              size="small"
              placeholder="Sri Lanka"
              fullWidth
              {...register("address.country")}
              error={!!errors.address?.country}
              helperText={errors.address?.country?.message}
            />
          </FlexRow>
          <FieldGroup>
            <TextField
              label="Email"
              defaultValue=""
              size="small"
              placeholder="someone@example.com"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FieldGroup>
          <FieldGroup>
            <TextField
              label="Password"
              type="password"
              defaultValue=""
              size="small"
              placeholder="***************"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </FieldGroup>
          <FieldGroup>
            <TextField
              label="Mobile Number"
              type="number"
              size="small"
              placeholder="+94 (71) 666-0179"
              fullWidth
              {...register("contactNumber")}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber?.message}
            />
          </FieldGroup>
          <FieldGroup>
            <SignButton type="submit">Sign Up</SignButton>
          </FieldGroup>
          <AccountOption>
            Already have an account?{" "}
            <HaveAccountButton onClick={onSignUpClick}>
              Log in
            </HaveAccountButton>
          </AccountOption>
        </StyledForm>
      </SignSection>
    </>
  );
};

export default SignUp;
