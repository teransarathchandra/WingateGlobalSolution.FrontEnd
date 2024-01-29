import {
  Nav,
  NavbarNav,
  NavItem,
  NavLink,
  LinkText,
} from "../styles/navbar.styles";

const Navbar = () => {
  return (
    <Nav>
      <NavbarNav>
        <NavItem>
          <NavLink to="/home">
            <LinkText>Home</LinkText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/services">
            <LinkText>Services</LinkText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/aboutus">
            <LinkText>About Us</LinkText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contactus">
            <LinkText>Contact Us</LinkText>
          </NavLink>
        </NavItem>
      </NavbarNav>
    </Nav>
  );
};

export default Navbar;
