import styled from "styled-components";

export const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #e1bd05;
  width: 300px;
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
  padding: 10px 20px;
  column-gap: 10px;
  cursor: pointer;
  color: #204DAB;
  font-weight: ${({ isActive }) =>
    isActive
      ? "bold"
      : "400"};
  /* color: ${({ isActive }) =>
    isActive ? "#204DAB" : "#204DAB"}; */
  /* background-color: ${({ isActive }) =>
    isActive ? "#F0A500" : "transparent"};  */

  &:hover {
    /* background-color: #f0a500; */
    font-weight: bold;
  }
`;

export const StepIndicator = styled.div<{ isActive: boolean }>`
  height: ${({ isActive }) => isActive ? "25px" : "15px"};
  width: ${({ isActive }) => isActive ? "25px" : "15px"};
  margin: ${({ isActive }) => isActive ? "0 2px" : "0 7.5px"};
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive
      ? "#0F9D58"
      : "#ffffff"};
  margin-right: 10px;
  display: flex;
  justify-content: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    margin: -20px 0;
    height: 50px;
    width: 1px;
    z-index: ${({ isActive }) => isActive ? -1 : 1 };
    background-color: #ffffff;
  }
`;
