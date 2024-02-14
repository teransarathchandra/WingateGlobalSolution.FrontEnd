import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

const NavbarNav = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5rem;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
`;

const NavLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
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

export { Nav, NavbarNav, NavItem, NavLink, LinkText }