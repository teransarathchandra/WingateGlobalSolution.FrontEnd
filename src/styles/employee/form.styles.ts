import styled from "styled-components";

type FormProps = {
  width?: string;
};
export const StyledForm = styled.form<FormProps>`
  padding: 20px;
  border-radius: 10px;
  width: ${(props) => props.width};
`;
