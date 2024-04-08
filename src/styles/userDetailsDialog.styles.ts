import styled from "styled-components";

// You can use the same styles or adjust as necessary for the UserDetailsDialog
export const DialogHeaderContainer = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    p{
        font-weight: bolder;
    }
`;

export const DialogUserContainer = styled.div`
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

export const DialogContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;