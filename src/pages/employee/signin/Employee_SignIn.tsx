import EmpSignInBox from "@app_components/employee/signIn/Employee_SignIn_Box"
import { FlexRow } from "@app_styles/signForm.styles";

const Employee_SignIn = () => {
  return (
    <>
    <FlexRow style={{ justifyContent: "center" }} >
      <EmpSignInBox onSignUpClick={ () => null } />
      </FlexRow>
    </>
  )
}

export default Employee_SignIn