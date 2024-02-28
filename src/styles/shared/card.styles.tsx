import styled from "styled-components";

const WhoCard = styled.div`
padding: 20px;
background-color: #fff;
width: 15rem;
margin-top: 5rem;
border-bottom-left-radius: 50px;
border-top-left-radius: 50px;
/* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; */
margin-left: auto; /* Aligns the card to the right side */
`

const WhoWeAreCard = styled.div`
padding: 20px;
margin: 5rem;
background-color: #ffffff;
width: 65rem;
height: 30rem;
margin-top: 5rem;
border-radius: 30px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`

const WeatherCard = styled.div`
  padding: 20px;
  margin: 5rem;
  background-color: #ffffff;
  width: 20rem; /* Adjust width as needed */
  height: 12rem;
  margin-top: 5rem;
  border-radius: 30px;
  text-align: center; /* Apply text alignment */
`;
const FlightContainer = styled.div`
  position: relative;
`;

const FlightCard = styled.div`
  margin-left: 5px;
  padding: 10px;
  background-color: #ffffff;
  width: 15rem;
  height: 16rem;
  margin-top: 5rem;
  border-radius: 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  position: relative; /* Add position relative */
  z-index: 1; /* Set z-index to a higher value */
  display: flex; /* Use flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  flex-direction: column; /* Align content in column */
  text-align: center /* Apply text alignment */

`;

const BrownCard = styled.div`
  position: absolute;
  top: 19rem;
  left: -25px;
  padding: 10px;
  background-color: #dc6951;
  width: 5rem;
  height: 5rem;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;
  z-index: 0; /* Set z-index to a lower value */
`;



export { WhoCard, WhoWeAreCard, WeatherCard, FlightCard, BrownCard, FlightContainer };
