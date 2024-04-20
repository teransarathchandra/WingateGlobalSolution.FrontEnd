//General
import { useEffect, useState } from "react";

//Redux
import { useNavigate } from "react-router-dom";
import useAxios from "@app_hooks/useAxios";
//Schemas
import signInSchema from "@app_schemas/signInSchema";

//MaterialUI
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

//Assets
import logo from "@app_assets/images/logo.png";

//Hooks + Effects
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useEmpAuth from "@app_hooks/employee/useEmpAuth";

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
const EmployeeSignInBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) });

  const [signInAttempted, setSignInAttempted] = useState(false);
  const {
    setEmployee,
    setEmployeeToken,
    setEmployeeRefreshToken,
    logoutEmployee,
  } = useEmployeeAuthContext();
  const { loginEmployee, auth } = useEmpAuth();
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.employee && auth.employee.accessToken && signInAttempted) {
      setEmployee(auth.employee);
      setEmployeeToken(auth.employee.accessToken);
      setEmployeeRefreshToken(auth.employee.refreshToken);
      console.log("Init Data", auth.employee);

      setTimeout("", 500);
      const focus = auth.employee.focus || "order";
      navigate("/app/" + focus);
    }else{
      setEmployee(null);
      setEmployeeToken(null);
      setEmployeeRefreshToken(null);
    }
  }, [
    auth.employee,
    navigate,
    setEmployeeRefreshToken,
    setEmployeeToken,
    setEmployee,
  ]);

  const onSubmit = async (data: SignInFormData) => {
    logoutEmployee();
    setSignInAttempted(true);
    await loginEmployee(api, data);
  };

  return (
    <>
      <BackSection onClick={() => navigate("/home")}>
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
