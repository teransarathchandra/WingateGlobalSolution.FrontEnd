import styled from "styled-components";
import { theme } from './theme';

const HomeSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5em;
  min-height: 100vh;
  padding: 0 2rem;
`;

const WelcomeImage = styled.img`
  max-width: 700px;
  width: 100%;
  border-radius: 20%;
`;

const BlobImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 35vw;
  height: 100vh;
  background-color: ${theme.colors.primary};
  border-radius: 0 13% 0 0;
  z-index: -1;
`;

const HomePageBackground = styled.div`
  min-width: 100%;
  padding-top:5rem;
  background-color: #e1bd05;
`;

export { HomeSection, WelcomeImage, BlobImageBackground, HomePageBackground };
