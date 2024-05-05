import styled from 'styled-components';

export const ReportButtonModified = styled.button`
  background: linear-gradient(45deg, #e1bd05, #ffc107); // Gradient from vibrant yellow
  color: white;
  border: none;
  border-radius: 25px; // Smooth rounded corners
  padding: 10px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.2s;

  position: fixed;
  bottom: 10px;
  left: 10px;

  &:hover {
    background: linear-gradient(45deg, #ffc107, #e1bd05); // Invert gradient on hover
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); // Enhanced shadow on hover
    transform: translateY(-3px); // Slight lift effect
  }

  &:active {
    transform: translateY(1px); // Subtle press down effect
  }
`;





export const AddButtonModified = styled.button`
  background: linear-gradient(45deg, #e1bd05, #ffc107); // Gradient from vibrant yellow
  color: white;
  border: none;
  border-radius: 25px; // Smooth rounded corners
  padding: 10px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.2s;

  position: fixed;
  bottom: 10px;
  right: 10px;

  &:hover {
    background: linear-gradient(45deg, #ffc107, #e1bd05); // Invert gradient on hover
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); // Enhanced shadow on hover
    transform: translateY(-3px); // Slight lift effect
  }

  &:active {
    transform: translateY(1px); // Subtle press down effect
  }
`;
