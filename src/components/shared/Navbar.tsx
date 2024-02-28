import { useSelector } from "react-redux";
import {
  Nav,
  NavbarNav,
  NavItem,
  NavLink,
  LinkText,
} from "../../styles/navbar.styles";
import { useEffect, useState } from "react";

interface NavbarProps {
  isVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isVisible }) => {
  const [scrolled, setScrolled] = useState  (false);
  const username = useSelector(
    (state: any) => state.auth?.user?.data?.name?.firstName
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50; // You can adjust the scroll distance as needed
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  if (!isVisible) {
    return null;
  }

  return (
    <Nav scrolled={scrolled}>
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
        {username && (
          <NavItem>
            <NavLink to="/profile">
              <LinkText>{username}</LinkText>
            </NavLink>
          </NavItem>
        )}
      </NavbarNav>
    </Nav>
  );
};

export default Navbar;
