import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "@app_schemas/signUpSchema";
import { StyledForm } from "@app_styles/shared/form.styles";
import { HeadingSection } from "@app_styles/shared/heading.styles";
import {
  SignSection,
  FlexRow,
  SignButton,
  AccountOption,
  HaveAccountButton,
} from "@app_styles/signForm.styles";
import useAuth from "@app_hooks/useAuth";
import SignUpFormData from "@app_interfaces/ISignUp";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useLocalStorage from "@app_hooks/useLocalStorage";
import useAxios from "@app_hooks/useAxios";

interface SignUpProps {
  onSignUpClick: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUpClick }) => {
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(signUpSchema) });

  // const [storedUser, setStoredUser] = useLocalStorage('app-user');
  // const [signInAttempted, setSignInAttempted] = useState(false);

  // const { registerUser, auth } = useAuth();
  const { registerUser } = useAuth();
  const api = useAxios();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   setStoredUser(auth.user);
  //   if (auth.user && signInAttempted) {
  //     navigate("/order");
  //   }
  // }, [auth.user, navigate, setStoredUser, signInAttempted]);

  const onSubmit = async (data: SignUpFormData) => {
    // console.log("data", data);
    // setSignInAttempted(true);
    const response = await registerUser(api, data);
    if (response && response.status == 201) {
      onSignUpClick();
    } else {
      console.error("User registration failed");
    }
  };

  // useEffect(() => {
  //   if (auth.error) {
  //     Object.keys(auth.error).forEach((field) => {
  //       setError(field as keyof SignUpFormData, {
  //         type: "server",
  //         message: auth.error[field],
  //       });
  //     });
  //   }
  // }, [auth.error, setError]);

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
              margin="dense"
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
              margin="dense"
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
              margin="dense"
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
              margin="dense"
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
              margin="dense"
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
              margin="dense"
            />
          </FlexRow>
          <TextField
            label="Email"
            defaultValue=""
            size="small"
            placeholder="someone@example.com"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="dense"
          />
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
            margin="dense"
          />
          <TextField
            label="Mobile Number"
            type="number"
            size="small"
            placeholder="+94 (71) 666-0179"
            fullWidth
            {...register("contactNumber")}
            error={!!errors.contactNumber}
            helperText={errors.contactNumber?.message}
            margin="dense"
          />
          <SignButton type="submit">Sign Up</SignButton>
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
