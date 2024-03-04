import styled from "styled-components";
import { theme } from "../theme";

type ButtonProps = {
  width: string;
  height?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
};
export const PrimaryButton = styled.button<ButtonProps>`
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: 5px;
  border: none;
  color: white;
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  background-color: ${theme.colors.primary};
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

type FlexRowProps = {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  columnGap?: string;
  rowGap?: string;
  padding?: string;
  margin?: string;
};
export const FlexRow = styled.div<FlexRowProps>`
  display: flex;
  row-gap: ${(props) => props.rowGap};
  column-gap: ${(props) => props.columnGap};
  padding: ${(props) => props.padding};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin: ${(props) => props.margin};
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

type ImageProps = {
  width: string;
  height: string;
};
export const ImageContainer = styled.img<ImageProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
