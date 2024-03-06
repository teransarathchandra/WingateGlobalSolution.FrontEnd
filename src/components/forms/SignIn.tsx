import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signInSchema from "../../schemas/signInSchema";
import logo from "../../assets/images/logo.png";
import { StyledForm } from "../../styles/shared/form.styles";
import { HeadingSection } from "../../styles/shared/heading.styles";
import {
  SignSection,
  CompanyLogo,
  CompanyLogoImage,
  FieldGroup,
  PasswordHandleSection,
  SignButton,
  AccountOption,
  HaveAccountButton,
} from "../../styles/signForm.styles";
import useAuth from "../../hooks/useAuth";
import SignInFormData from "../../interfaces/ISignIn";
import { googleLogin } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onSignUpClick }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) });

  const { loginUser, authError } = useAuth();

  // const onSubmit = (data: SignInFormData) => loginUser(data);

  const navigate = useNavigate();

  const onSubmit = (data: SignInFormData) => {
    // You might want to await the loginUser function if it returns a Promise
    loginUser(data);

    // Navigate after successful login
    if (!authError) {
      navigate('/order');
    }
  };

  useEffect(() => {
    console.log(authError);
    if (authError) {
      Object.keys(authError).forEach((field) => {
        setError(field as keyof SignInFormData, {
          type: "server",
          message: authError[field],
        });
      });
    }
  }, [authError, setError]);

  const dispatch = useDispatch();

  const handleGoogleSuccess = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse.credential));

    navigate('/order');
  };

  return (
    <>
      <SignSection>
        <CompanyLogo>
          <CompanyLogoImage src={logo} />
        </CompanyLogo>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <HeadingSection>
            <h1>Welcome!</h1>
            <p>Welcome! Please enter your details.</p>
          </HeadingSection>
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
              defaultValue=""
              size="small"
              placeholder="***************"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </FieldGroup>
          <PasswordHandleSection>
            <div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </div>
            <div>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </div>
          </PasswordHandleSection>
          <FieldGroup>
            <SignButton type="submit">Sign in</SignButton>
          </FieldGroup>
          <FieldGroup>
            <GoogleLogin
              width="360px"
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </FieldGroup>
          <AccountOption>
            Don’t have an account?{" "}
            <HaveAccountButton onClick={onSignUpClick}>
              Sign Up
            </HaveAccountButton>
          </AccountOption>
        </StyledForm>
      </SignSection>
    </>
  );
};

export default SignIn;
