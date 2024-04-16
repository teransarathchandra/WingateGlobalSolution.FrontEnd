import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signInSchema from "@app_schemas/signInSchema";
import logo from "@app_assets/images/logo.png";
import { StyledForm } from "@app_styles/shared/form.styles";
import { HeadingSection } from "@app_styles/shared/heading.styles";
import {
  SignSection,
  CompanyLogo,
  CompanyLogoImage,
  PasswordHandleSection,
  SignButton,
  AccountOption,
  HaveAccountButton,
} from "@app_styles/signForm.styles";
import useAuth from "@app_hooks/useAuth";
import SignInFormData from "@app_interfaces/ISignIn";
import { googleLogin, googleLoginFailure } from "@app_redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@app_contexts/authContext";
import useAxios from "@app_hooks/useAxios";

interface SignInProps {
  onSignUpClick: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignUpClick }) => {
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) });

  const { setUser, setToken, setRefreshToken, logout } = useAuthContext();
  const [signInAttempted, setSignInAttempted] = useState(false);

  const { loginUser, auth } = useAuth();

  const api = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user && auth.user.accessToken && signInAttempted) {
      setUser(auth.user);
      setToken(auth.user.accessToken);
      setRefreshToken(auth.user.refreshToken);
      navigate("/order");
    }
  }, [auth.user, navigate, setRefreshToken, setToken, setUser, signInAttempted]);

  const onSubmit = async (data: SignInFormData) => {
    logout();
    setSignInAttempted(true);
    await loginUser(api, data);
  };

  const handleGoogleSuccess = useCallback((credentialResponse) => {
    setSignInAttempted(true);
    dispatch(googleLogin(api, credentialResponse.credential));
  }, [api, dispatch]);

  const handleGoogleFailure = useCallback(() => {
    dispatch(googleLoginFailure("Login Failed"));
  }, [dispatch]);

  return (
    <SignSection>
      <CompanyLogo>
        <CompanyLogoImage src={logo} />
      </CompanyLogo>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <HeadingSection>
          <h1>Welcome!</h1>
          <p>Welcome! Please enter your details.</p>
        </HeadingSection>
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
          defaultValue=""
          size="small"
          placeholder="***************"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="dense"
        />
        <PasswordHandleSection>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </PasswordHandleSection>
        <SignButton type="submit">Sign in</SignButton>
        <GoogleLogin
          width="360px"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
        <AccountOption>
          Don’t have an account?{" "}
          <HaveAccountButton onClick={onSignUpClick}>Sign Up</HaveAccountButton>
        </AccountOption>
      </StyledForm>
    </SignSection>
  );
};

export default SignIn;
