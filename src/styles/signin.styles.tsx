import styled from "styled-components";

const SignInSection = styled.div`
  max-width: 500px;
  min-width: 400px;
  width: 100%;
`;

const CompanyLogo = styled.div`
  display: flex;
  justify-content: center;
`;

const CompanyLogoImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  width: 100%;
  -webkit-filter: drop-shadow(5px 5px 5px #222);
  filter: drop-shadow(5px 5px 5px #222);
`;

const SignInHeading = styled.div`
  padding-top: 1em;
`;

const SignInForm = styled.form`
  padding: 1em 0em;
`;

const FieldGroup = styled.div`
  padding: 0.5em 0;
`;

const PasswordHandleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SignInButton = styled.button`
  width: 100%;
  padding: 0.8em 0;
  border-radius: 5px;
  border: 0;
  background: linear-gradient(
    180deg,
    rgba(225, 189, 5, 1) 0%,
    rgba(225, 189, 5, 1) 100%
  );
  color: #ffffff;
  filter: drop-shadow(0px 1px 2px rgba(225, 189, 5, 1));
  &:hover {
    cursor: pointer;
  }
`;

const AccountOption = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3em 0;
`;

const SignUpButton = styled.span`
  font-weight: 600;
  color: #05961d;
  padding-left: 0.5em;
  &:hover {
    cursor: pointer;
  }
`;

export {
  SignInSection,
  CompanyLogo,
  CompanyLogoImage,
  SignInHeading,
  SignInForm,
  FieldGroup,
  PasswordHandleSection,
  SignInButton,
  AccountOption,
  SignUpButton,
};
