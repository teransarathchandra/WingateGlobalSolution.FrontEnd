import styled from "styled-components";

// In userDetailsDialog.styles.ts
export const DialogHeaderContainer = styled.div`
    display: flex;
    justify-content: space-around; // Space between left and right items
    align-items: flex-start; // Align items to start vertically
    width: 100%; // Use the full width of the container
    flex-wrap: wrap; // Allow items to wrap if needed

    p{
        font-weight: bolder;
    }
`;

export const DialogHeaderLeft = styled.div`
    display: flex;
    flex-direction: column; // Stack items vertically
`;

export const DialogHeaderRight = styled.div`
    display: flex;
    align-items: flex-start; // Align to the top
`;


export const DialogUserContainer = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;

    /* .header{
        font-weight: bold;
        font-size: large;
    } */
`;

export const DialogUserDetails = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`;

export const DialogOrdersContainer = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
`;

export const DialogOrderDetails = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    div{
    display: flex;
    justify-content: space-between;
    gap: 10px;
    }
`;

export const DialogHeaderImage = styled.img`
    display: flex;
    justify-content: center;
    width: 200px;
    height: 200px;
    padding: 0 50px;
    background-color: #fff;
`;

export const ReportButton = styled.button`
position: relative;
left: 500px;
  width: 90px;
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
    background-color: #E1BD05; // A slightly darker yellow on hover
  }

  &:active {
    transform: scale(0.98); // Slightly shrink the button when clicked
  }
`;

export const StyledDialogContainer = styled.div`
    padding: 50px; /* Add padding to create inner space */
`;