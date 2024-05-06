import styled from "styled-components";

const GetInTouchSection = styled.div`
  max-width: 100vh;
  max-height: 100vh;
  background-color: #bfbfbf;
  margin: 5rem 2rem;
  font-size: 35px;
  font-weight: 700;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GetForm = styled.form`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 0rem;
  flex-direction: column;
`;
const FieldGroup = styled.div`
  padding: 0.5rem;
  align-items: center;
  flex-direction: row;
  margin-left: 0rem;
`;

const SubmitBtn = styled.button`
  background-color: #191919;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin: 25px;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

const Footer = styled.footer`
  background-color: #252525;
  color: #fff;
  width: 100%;
  height: 200px;
`;
const Text = styled.p`
  color: #fff;
  opacity: 0.4;
  font-size: 20px;
  text-align: center;
  font-family: monospace;
  letter-spacing: 0.2rem;
  margin: 10px;
`;
const Logo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 10px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0;
  padding-top: 40px;
`;
const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Item = styled.li`
  margin: 1rem;
  padding: 0.5rem;
  font-weight: 500;
  width: 7%;
  color: white;
  font-family: "monospace";
  letter-spacing: 0.03rem;
  opacity: 0.6;
`;
export {
  GetInTouchSection,
  GetForm,
  FieldGroup,
  SubmitBtn,
  Footer,
  Text,
  Logo,
  WgsLogo,
  Container,
  List,
  Item,
};
