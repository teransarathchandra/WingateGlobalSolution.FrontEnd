import styled from "styled-components";

export const SpinnerOverlay = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 1); // Light gray background
  /* background-color: rgba(0, 0, 0, 0.8); // Light gray background */
  display: flex;
  justify-content: center;
  align-items: center;
`;
