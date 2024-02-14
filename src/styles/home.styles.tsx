import styled from "styled-components";

const HomeSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5em;
  min-height: 100vh;
`;

const WelcomeImage = styled.img`
  max-width: 700px;
  width: 100%;
  border-radius: 20%;
  -webkit-border-radius: 20%;
  -moz-border-radius: 20%;
  -ms-border-radius: 20%;
  -o-border-radius: 20%;
`;

const BlobImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 550px;
  height: 100vh;
  background-color: #e1bd05;
  border-radius: 0 13% 0 0;
  z-index: -1;
`;

export { HomeSection, WelcomeImage, BlobImageBackground };
