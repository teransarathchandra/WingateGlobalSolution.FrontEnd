import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  max-width: 600px;
  width: 100%;
`;

const NavbarNav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0 0.5em;
`;

const NavLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  filter: grayscale(100%) opacity(1);
  &:hover {
    filter: grayscale(0%) opacity(1);
    color: rgba(225, 189, 5, 1);
  }
`;

const LinkText = styled.span`
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
`;

export { Nav, NavbarNav, NavItem, NavLink, LinkText }