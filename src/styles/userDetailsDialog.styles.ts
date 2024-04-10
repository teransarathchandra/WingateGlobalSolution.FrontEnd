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
    flex-direction: row;
    justify-content: space-evenly;
    gap: 10px;
`;

export const DialogHeaderImage = styled.img`
    display: flex;
    justify-content: center;
    width: 200px;
    height: 200px;
    padding: 0 50px;
    background-color: #fff;
`;

