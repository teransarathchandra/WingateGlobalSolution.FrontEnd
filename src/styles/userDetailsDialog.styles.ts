// UserDetailsDialog.styles.ts
import styled from 'styled-components';

export const StyledDialogContainer = styled.div`
  padding: 50px;
  border-radius: 10px; // Rounded corners
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // Shadow effect
  background: #fff; // White background
`;

export const DialogHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: #e1bd05; // Example header background color
  color: #fff; // Text color for the header
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;`;

export const DialogHeaderLeft = styled.div`
  text-align: left;

`;

export const DialogHeaderRight = styled.div`
  text-align: right;
`;

export const DialogUserContainer = styled.div`
  background-color: #f6f6f6; // Light grey background for the section
  border-radius: 8px; // Rounded corners for the section
  padding: 20px;
  margin-bottom: 30px;
`;

export const DialogUserDetails = styled.div`
 display: flex;
`;

export const DialogOrdersContainer = styled.div`
  background-color: #f6f6f6; // Light grey background for the section
  border-radius: 8px; // Rounded corners for the section
  padding: 20px;
`;

export const DialogOrderDetails = styled.div`
  display: flex;
  flex-direction: column; // Each order will be in its own row
  justify-content: flex-start;
  gap: 10px; // Space between rows

  // Styling for each order card
  div {
    display: flex;
    justify-content: space-around;
    background: #ffffff; // White background for each order card
    border-radius: 8px; // Rounded corners for each order card
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Shadow for each order card
    padding: 15px; // Padding inside each order card
    margin: 5px 0; // Margin between each order card
  }
`;

export const DialogHeaderImage = styled.img`
  border-radius: 50%; // Circular image
`;

export const ReportButton = styled.button`
  background-color: #4caf50; // Green background
  color: white;
  border: none;
  border-radius: 20px; // Rounded corners for the button
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
position: relative;
left: 500px;
  width: 190px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 30px 20px 0px;
  background-color: white; // Light yellow background: ;
  color: #000; // Black text color
  border: 2px solid #E1BD05; // Solid black border
  border-radius: 10px; // Rounded corners (adjust radius as needed)
  padding: 10px 20px; // Padding inside the button (adjust as needed)
  font-size: 16px; // Font size (adjust as needed)
  font-weight: bold; // Bold font weight
  cursor: pointer; // Changes the cursor on hover
  outline: none; // Removes the outline on focus for aesthetics
  transition: background-color 0.3s, transform 0.1s; // Smooth transition for visual effects

  &:hover {
    background-color: #45a049; // Darker green on hover
  }
  &:active {
    transform: scale(0.98); // Slightly shrink the button when clicked
  }
`;


