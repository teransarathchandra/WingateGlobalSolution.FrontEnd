import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: #05961d;
  padding-left: 0.5em;
  &:hover {
    cursor: pointer;
  }
`;

const ToggleFormLink = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default ToggleFormLink;
