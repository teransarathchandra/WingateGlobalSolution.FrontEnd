//General
import { useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Schemas
import signInSchema from "@app_schemas/signInSchema";

//MaterialUI
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";

//Assets
import logo from "@app_assets/images/logo.png";

//Hooks + Effects
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@app_hooks/useAuth";

//Interfaces
import SignInFormData from "@app_interfaces/ISignIn";

//Styles
import { StyledForm } from "@app_styles/employee/form.styles";
import { HeadingSection } from "@app_styles/employee/heading.styles";
import {
  BackSection,
  Container,
  SignSection,
  CompanyLogo,
  CompanyLogoImage,
  FieldGroup,
  PasswordHandleSection,
  SignButton,
} from "@app_styles/employee/signForm.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//Components
const EmployeeSignInBox = ({ onSignUpClick }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) });

  const { loginUser, authError } = useAuth();

  const navigate = useNavigate();

  const onSubmit = (data: SignInFormData) => {
    loginUser(data);
    // Navigate after successful login
    if (!authError) {
      navigate("/app/employee");
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

  return (
    <>
      <BackSection
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          gap: "10px",
          top: "10px",
          left: "10px",
        }}
        onClick={() => navigate("/home")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Back</p>
      </BackSection>
      <Container>
        <SignSection>
          <CompanyLogo>
            <CompanyLogoImage src={logo} />
          </CompanyLogo>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <HeadingSection>
              <h1>Welcome!</h1>
              <p>Employee Portal</p>
            </HeadingSection>
            <FieldGroup>
              <TextField
                label="Email"
                defaultValue=""
                size="small"
                placeholder="someone@wingate.com"
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
            </PasswordHandleSection>
            <FieldGroup>
              <SignButton type="submit">Sign in</SignButton>
            </FieldGroup>
          </StyledForm>
        </SignSection>
      </Container>
    </>
  );
};

export default EmployeeSignInBox;
