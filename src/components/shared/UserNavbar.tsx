import { StyledLink } from "@app_styles/user.navbar.styles";

const UserNavbar = () => {
    return (
        <>
        <StyledLink to="/user-info">My Information</StyledLink>
        <StyledLink to="/user-password">Change Password</StyledLink>
        <StyledLink to="/settings/other">Other</StyledLink>
        </>
    );
  };
  
  export default UserNavbar;