import styled from "styled-components";

const ServiceCard = styled.div`
  padding: 20px;
  width: 45rem;
  height: 50rem;
  background-color: #ffffff;
  border-radius: 0px 66px 66px 0px;
  box-shadow: 0px 10px 20px 0px #747171;
`;
const ServiceSubCard = styled.div`
  padding: 10px;
  width: 42rem;
  height: 42.5rem;
  margin-top:30px;
  background-color: #ffffff;
  border-radius: 60px 60px 60px 60px;
  border-style: solid;
  border-width:1px;
  border-color:#b0aeae
`;
const ServiceTiles = styled.div`
  padding: 20px 20px;
  width: 10rem;
  height: 10rem;
  background-color: #ffffff;
  border-radius: 27px;
  box-shadow: 10px 10px 10px 5px #c3bfbf;
  font-size: 3.5rem;
  color:#204DAB;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
`;
const ServiceTileHeader = styled.h6`
  font-size: 1rem;
  font-weight: 800;
  text-align: center;
  color:#000000;
  display:flex;
  margin-top:10px;
  justify-content: center;
  align-items:center;
`;
const ServiceImage = styled.img`
  width:160px;
  height:160px;
  border-radius: 80px;
  display:flex;
  margin-top:10px;
  justify-content: center;
  align-items:center;
`;

export { ServiceCard, ServiceSubCard, ServiceTiles, ServiceTileHeader, ServiceImage };