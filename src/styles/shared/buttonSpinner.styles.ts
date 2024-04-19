import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const ButtonSpinner = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    /* border: 3px solid rgba(255,255,255,.3); */
    border: 3px solid rgba(0,0,0,.3);
    border-top-color: rgba(0,0,0,1);
    border-radius: 50%;
    animation: ${spin} 1s ease-in-out infinite;
`;

export default ButtonSpinner;