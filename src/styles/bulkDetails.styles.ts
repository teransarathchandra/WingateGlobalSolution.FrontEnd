import styled from "styled-components";

const HeaderDiv = styled.div`
  background-color: #e1bd05;
  max-width: 100%;
  height: 120px;
  font-size: 56px;
  color: #ffffff; 
  padding-left: 50px; 
  padding-top: 50px; 
  text-align: left; 
`;

const Div = styled.div`
  font-size: 20px;
  margin-bottom: 100px;
  padding: 20px;
  align-items: left;
  display: flex; 
  flex-direction: column; 
`;

const Form = styled.form`
  background-color: #ffffff;
  max-width: 50%;
  height: auto;
  margin: 100px auto;
  align-items: left;
  text-align: left; 
  font-size: 36px; 
  font-weight: normal;
  padding: 25px;
  box-shadow: 6px 7px 13px rgba(158, 153, 158, 1);
`;

const FieldGroup = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  margin-bottom: 20px;
`;

const UpdateBtn = styled.button`
  background-color: #e1bd05;
  color: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d4b305; 
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; // Aligns children (button) to the right
  padding: 10px; // Optional: adds some spacing from the edges
`;

export { HeaderDiv, Form, FieldGroup, UpdateBtn, Div, ButtonContainer };
