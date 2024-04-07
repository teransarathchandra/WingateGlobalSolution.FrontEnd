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
`;

const Form = styled.form`
  background-color: #ffffff;
  max-width: 50%;
  height: 850px;
  margin: 100px;
  align-items: left;
  text-align: left;
  font-size: 36px;
  font-weight: 10px;
  justify-content: left;
  padding-left: 25px;
  padding-top: 15px;
  -webkit-box-shadow: 6px 7px 13px 0px rgba(158, 153, 158, 1);
  -moz-box-shadow: 6px 7px 13px 0px rgba(158, 153, 158, 1);
  box-shadow: 6px 7px 13px 0px rgba(158, 153, 158, 1);
`;

const FieldGroup = styled.div`
  padding: 0.5rem;
  align-items: left;
  flex-direction: row;
`;

const UpdateBtn = styled.button`
  background-color: #e1bd05;
  color: #fff;
  border-radius: 10px;
  margin-top: 40px;
  padding: 5px;
  width: 100px;
  height: 40px;
  cursor: pointer;
`;

export { HeaderDiv, Form, FieldGroup, UpdateBtn, Div };
