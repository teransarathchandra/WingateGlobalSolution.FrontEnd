import styled from "styled-components";
import { Link } from 'react-router-dom'; // Import Link component

// Assuming SecHeadContainer is already styled, you might need to adjust its styling
// const NavContainer = styled.SecHeadContainer`
//   display: flex;
//   flex-direction: row; // Change direction to row for a horizontal nav bar
//   justify-content: space-around; // Distribute the space evenly around the links
//   align-items: center; // Center align items
// `;

export const StyledLink = styled(Link)`
  position: relative; // Needed to position the ::after pseudo-element
  text-decoration: none;
  color: #000; // Adjust the color as necessary
  padding: 10px;
  margin: 90px 10px;
  overflow: hidden; // Ensures the pseudo-element doesn't overflow the link boundaries

  // ::after pseudo-element for the underline
  &::after {
    content: '';
    position: absolute;
    width: 0; // Start with no width
    height: 2px; // Height of the underline
    bottom: 0; // Position at the bottom of the link
    left: 50%; // Start from the middle
    background-color: #E1BD05; // Color of the underline
    transition: all 0.3s ease; // Smooth transition for the effect
    transform: translateX(-50%); // Ensure the growth starts from the center
  }

  &:hover::after {
    width: 100%; // Full width on hover
    left: 0; // Reset left position to ensure proper expansion
    transform: translateX(0%); // Reset transform to match the new width
  }
`;


//export { StyledLink};