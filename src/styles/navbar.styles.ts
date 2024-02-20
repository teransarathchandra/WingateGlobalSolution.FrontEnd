import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

type NavbarProps = {
  scrolled: boolean
}

const Nav = styled.nav<NavbarProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: ${({ scrolled }) => scrolled ? '#F6F6F6' : 'transparent'};
  box-shadow: ${({ scrolled }) => scrolled ? '6px 4px 20px 2px rgba(0,0,0,0.3)' : 'none'};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

const NavbarNav = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5rem;

  @media (min-width: 481px) and (max-width: 767px) {
    display: none;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin: 0 1rem;
`;

const NavLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: filter 0.3s ease;
  filter: grayscale(100%) opacity(1);
  &:hover {
    filter: grayscale(0%) opacity(1);
    color: #05961d;
  }
`;

const LinkText = styled.span`
  margin: 0.5rem 1rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

export { Nav, NavbarNav, NavItem, NavLink, LinkText };
