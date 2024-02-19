import styled from "styled-components";

type OverlayProps = {
  show: boolean
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1; // Ensure it's below the sidenav (zIndex:2)
  display: ${({ show }) => (show ? "block" : "none")};
`;
