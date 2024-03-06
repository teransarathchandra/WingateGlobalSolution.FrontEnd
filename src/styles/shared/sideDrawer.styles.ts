import styled from "styled-components";

export const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fffbea; /* Adjust to match your exact color */
  width: 300px; /* Adjust width as needed */
  min-height: 100vh;
`;

export const HeaderImage = styled.img`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  padding: 0 50px;
  background-color: #fff;
`;

export const Step = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 20px; /* Adjust padding as needed */
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? "#FFFFFF" : "#C1C1C1"}; /* Adjust active/non-active colors */
  background-color: ${({ isActive }) =>
    isActive ? "#F0A500" : "transparent"}; /* Adjust active background color */

  &:hover {
    background-color: #f0a500; /* Hover color, adjust as needed */
    color: #ffffff;
  }
`;

export const StepIndicator = styled.div<{ isActive: boolean }>`
  height: ${({ isActive }) => isActive ? "30px" : "15px"};
  width: ${({ isActive }) => isActive ? "30px" : "15px"}; /* Adjust as needed */
  margin: ${({ isActive }) => isActive ? "0px" : "0 7.5px"}; /* Adjust as needed */
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive
      ? "#0F9D58"
      : "#C1C1C1"}; /* Adjust active/non-active indicator colors */
  margin-right: 10px; /* Adjust as needed */
  display: flex;
  justify-content: center;
  &::before {
    content: ' ';
    padding: 10px 0;
    height: 10px;
    background-color: #fff;
  }
`;
