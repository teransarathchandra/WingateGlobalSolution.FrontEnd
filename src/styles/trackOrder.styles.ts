import styled from "styled-components";

const Div = styled.div`
    width: 40%;
    height: 100vh;
    background-color: #e1bd05;
    border-radius: 0 180px 0  0 ; 
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
    -webkit-box-shadow: 7px 7px 16px -7px rgba(0,0,0,0.52);
    -moz-box-shadow: 7px 7px 16px -7px rgba(0,0,0,0.52);
    box-shadow: 7px 7px 16px -7px rgba(0,0,0,0.52);
    width: 60%;
    height: 50%;
    margin-right: 100px;
    margin-left: 300px;
    margin-top: 100px;
    justify-content: center;
    align-items: center;    

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

export { Div, WelcomeImage, Logo, DetailsDiv, Button};