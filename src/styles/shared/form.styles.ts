import styled from "styled-components";

type FormProps = {
  width?: string;
}
export const StyledForm = styled.form<FormProps>`
  padding: 20px;
  border-radius: 10px;
  width: ${(props) => props.width};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
