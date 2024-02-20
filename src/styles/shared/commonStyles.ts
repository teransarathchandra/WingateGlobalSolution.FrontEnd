import styled from "styled-components";

export const PrimaryButton = styled.button`
  padding: 0.8em 1em;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 0.5em;
  margin: 0.5em 0;
  box-sizing: border-box;
`;
