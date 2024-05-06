import styled from "styled-components";

const Div = styled.div`
    height: 100vh;
    background-color: #e1bd05;
    border-radius: 0 25% 0  0 ; 
`;

const WelcomeImage = styled.img`
    width: 500px; 
    height: 400px; 
    border-radius: 100px; 
    //margin-top: 250px;
    margin-left: 50px;
    object-fit: cover;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-top: 30px;
  margin-left: 220px;
  margin-bottom: 50px;
`;
const DetailsDiv = styled.div`
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 5%;
    width: 100%;
`;

const Button = styled.button`
    color: #ffff;
    background-color: #e1bd05;
    border-radius: 10px;
    border: #e1bd05;
    width: 90px;
    height: 40px; 
    cursor: pointer;
    margin-top: 140px;
    margin-left: 10px;

`;

export { Div, WelcomeImage, Logo, DetailsDiv, Button };