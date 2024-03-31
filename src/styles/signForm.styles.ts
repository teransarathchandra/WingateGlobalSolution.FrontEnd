import styled from "styled-components";

const SignSection = styled.div`
  max-width: 400px;
  min-width: 400px;
  width: 100%;
`;

const CompanyLogo = styled.div`
  display: flex;
  justify-content: center;
`;

const CompanyLogoImage = styled.img`
  max-width: 160px;
  max-height: 160px;
  filter: drop-shadow(5px 5px 5px #222);
`;

const SignForm = styled.form`
  padding: 1em 0em;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PasswordHandleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SignButton = styled.button`
  width: 100%;
  padding: 0.8em 0;
  margin: 1em 0;
  border-radius: 5px;
  border: 0;
  background: linear-gradient(
    180deg,
    rgba(225, 189, 5, 1) 0%,
    rgba(225, 189, 5, 1) 100%
  );
  color: #ffffff;
  font-size: 1rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    cursor: pointer;
  }
`;

const AccountOption = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3em 0;
`;

const HaveAccountButton = styled.span`
  font-weight: 600;
  color: #05961d;
  padding-left: 0.5em;
  &:hover {
    cursor: pointer;
  }
`;

export {
  SignSection,
  CompanyLogo,
  CompanyLogoImage,
  FlexRow,
  SignForm,
  PasswordHandleSection,
  SignButton,
  AccountOption,
  HaveAccountButton,
};
