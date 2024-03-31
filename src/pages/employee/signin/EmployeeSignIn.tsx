import EmpSignInBox from "@app_components/employee/signIn/EmployeeSignInBox"
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