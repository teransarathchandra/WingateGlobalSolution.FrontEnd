import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signInSchema from "../schemas/signInSchema"
import logo from "../assets/images/logo-removebg.png";
import {
  SignInSection,
  CompanyLogo,
  CompanyLogoImage,
  SignInHeading,
  FieldGroup,
  PasswordHandleSection,
  SignInButton,
  AccountOption,
  SignUpButton,
} from "../styles/signin.styles"

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle your form submission here
  };

  return (
    <SignInSection className="sign-in-section">
      <CompanyLogo className="company-logo">
        <CompanyLogoImage src={logo} />
      </CompanyLogo>
      <SignInHeading className="sign-in-heading">
        <h1>Welcome!</h1>
      </SignInHeading>
      <div className="sign-in-form-heading">
        <p>Welcome! Please enter your details.</p>
      </div>
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="email-field">
          <TextField
            label="Email"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            placeholder="Enter your email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FieldGroup>
        <FieldGroup className="password-field">
          <TextField
            label="Password"
            id="outlined-size-small"
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
        <PasswordHandleSection className="password-handle-section">
          <div className="remember-me-field">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </div>
          <div className="forgot-password-field">
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </div>
        </PasswordHandleSection>
        <FieldGroup className="sign-in-button-field">
          <SignInButton type="submit" className="sign-in-button">
            Sign in
          </SignInButton>
        </FieldGroup>
        <FieldGroup className="sign-in-with-google-button-field">
          <GoogleOAuthProvider clientId="<your_client_id>">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </FieldGroup>
        <AccountOption className="dont-have-an-account">
          Don’t have an account?{" "}
          <SignUpButton className="sign-up-button">Sign up for free!</SignUpButton>
        </AccountOption>
      </form>
    </SignInSection>
  );
};

export default SignIn;
