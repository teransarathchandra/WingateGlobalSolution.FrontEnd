import { useSelector } from "react-redux";
import {
  Nav,
  NavbarNav,
  NavItem,
  NavLink,
  LinkText,
} from "@app_styles/navbar.styles";
import { useEffect, useState } from "react";

interface NavbarProps {
  isVisible: boolean;
  homeRef: any;
  servicesRef: any;
  aboutUsRef: any;
  contactUsRef: any;
}

const Navbar: React.FC<NavbarProps> = ({
  isVisible,
  homeRef,
  servicesRef,
  aboutUsRef,
  contactUsRef,
}) => {
  const [scrolled, setScrolled] = useState(false);
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

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Nav scrolled={scrolled}>
      <NavbarNav>
        <NavItem>
          <NavLink onClick={() => scrollToSection(homeRef)} to=''>
            <LinkText>Home</LinkText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => scrollToSection(servicesRef)} to=''>
            <LinkText>Services</LinkText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => scrollToSection(aboutUsRef)} to=''>
            <LinkText>About Us</LinkText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => scrollToSection(contactUsRef)} to=''>
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
