import { useState } from "react";
import { Sidenav, Nav } from "rsuite";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import "rsuite/Sidenav/styles/index.css";
import "rsuite/Nav/styles/index.css";
import { Overlay } from "@app_styles/shared/overlay.styles";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "@app_assets/images/logo.png";
import { useActiveAuthContext } from "@app_contexts/authActiveContext";
import { useNavigate } from "react-router-dom";
import { useAppNavigation } from "@app_utils/appNavigation";
import toastUtil from "@app_utils/toastUtil";
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext";
import { Box } from "@mui/material";

const SideNav = () => {
  const navigate = useNavigate();
  const { isEmployee } = useActiveAuthContext();

  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const { employee } = useEmployeeAuthContext();
  const { handleAppNavigation } = useAppNavigation();
  if (!isEmployee()) {
    return null;
  }

  const toggleExpanded = () => setExpanded(!expanded);

  type Expand = {
    expanded: boolean;
  };

  const handleSelect = async (eventKey) => {
    setActiveKey(eventKey);
    if (employee) {
      const route = eventKeyMapping(eventKey);
      handleAppNavigation(route, employee.accessToken);
      setExpanded(false);
    } else {
      toastUtil.error("Access Denied!");
    }
  };

  const eventKeyMapping = (eventKey) => {
    const mapping = {
      '1-1': 'app/order',
      '2-1': 'app/restricted-orders',
      '2-2': 'app/restricted-order-type',
      '2-3': 'app/country',
      '2-4': 'app/category',
      '3-1': 'app/order-aggregation',
      '3-2': 'app/bulk-details',
      '3-3': 'app/bulk',
      '3-4': 'app/flight',
      '3-5': 'app/airline',
      '4-1': 'app/crm',
      '5-1': 'app/user',
      '6-1': 'app/warehouseInfo',
      '6-2': 'app/assign-details',
      '7-1': 'app/employee-manage',
      '7-2': 'app/employee-access',
      '8-1': 'app/quotation',
      '8-2': 'app/payment',
    };
    return mapping[eventKey] || '/';
  };

  const slideIn = keyframes`
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  `;

  const Container = styled.div<Expand>`
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 0%;
  left: 0;
  transform: translateY(-50%);
  z-index: 10000;
  display: ${({ expanded }) => (expanded ? "block" : "none")};
  animation: ${slideIn} 0.5s forwards; /* Apply the slideIn animation */
`;

  const ScrollableArea = styled(Box)`
  max-height: 100vh;
  overflow-y: auto; // Enable vertical scrolling
`;

  const NavItem = styled(Nav.Item)`
padding: 10px 20px; // Adjust padding if necessary
width: 100%; // Ensure full width
border-radius: 0px;
transition: background-color 0.2s;
&:hover {
  background-color: #f7dc6f;
  width: 100%; // Ensure the background covers full width on hover
}
`;

  const NavMenu = styled(Nav.Menu)`
padding: 10px 20px; // Adjust padding if necessary
width: 100%; // Ensure full width
border-radius: 0px;
transition: background-color 0.2s;
&:hover {
  background-color: #fbfaf3;
  width: 100%; // Ensure the background covers full width on hover
}
`;

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        style={{
          zIndex: 3,
          position: "fixed",
          top: 5,
          left: 10,
          cursor: "pointer",
          padding: ".6rem",
          margin: ".5rem",
          backgroundColor: "#2D2F39",
          borderRadius: "8%",
          width: "20px",
          height: "20px",
          color: "#fff"
        }}
        onClick={toggleExpanded}
      />
      {expanded && (
        <>
          <Overlay show={expanded} onClick={() => setExpanded(false)} />
          <Container expanded={expanded}>
            <ScrollableArea>
              <Sidenav
                style={{
                  minHeight: "100vh",
                  borderRadius: 0,
                  overflow: "auto"
                }}
              >
                <Sidenav.Header
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                    borderBottom: "1px solid #ddd"
                  }}
                >
                  <img
                    src={logo}
                    alt=""
                    style={{ width: "200px", height: "200px", borderRadius: 10 }}
                  />
                </Sidenav.Header>
                <Sidenav.Body>
                  <Nav activeKey={activeKey}>
                    <NavMenu
                      placement="rightStart"
                      eventKey="1"
                      title="Order"
                      icon={<MagicIcon />}
                    >
                      <NavItem eventKey="1-1" onSelect={handleSelect}>
                        Order Management
                      </NavItem>
                    </NavMenu>
                    <NavMenu
                      placement="rightStart"
                      eventKey="2"
                      title="Restricted Order"
                      icon={<MagicIcon />}
                    >
                      <NavItem eventKey="2-1" onSelect={handleSelect}>
                        Restricted Orders
                      </NavItem>
                      <NavItem eventKey="2-2" onSelect={handleSelect}>
                        Restricted Order Types
                      </NavItem>
                      <NavItem eventKey="2-3" onSelect={handleSelect}>
                        Country Info
                      </NavItem>
                      <NavItem eventKey="2-4" onSelect={handleSelect}>
                        Category Info
                      </NavItem>
                    </NavMenu>
                    <NavMenu
                      placement="rightStart"
                      eventKey="3"
                      title="Transport"
                      icon={<MagicIcon />}
                    >
                      <NavItem eventKey="3-1" onSelect={handleSelect}>
                        Order Aggregation
                      </NavItem>
                      <NavItem eventKey="3-2" onSelect={handleSelect}>
                        Bulk Details
                      </NavItem>
                      <NavItem eventKey="3-3" onSelect={handleSelect}>
                        Bulk
                      </NavItem>
                      <NavItem eventKey="3-4" onSelect={handleSelect}>
                        Flight
                      </NavItem>
                      <NavItem eventKey="3-5" onSelect={handleSelect}>
                        Airline
                      </NavItem>
                    </NavMenu>
                    <NavMenu
                      placement="rightStart"
                      eventKey="4"
                      title="Customer"
                      icon={<MagicIcon />}
                    >
                      <NavItem eventKey="4-1" onSelect={handleSelect}>
                        Customer Info
                      </NavItem>
                    </NavMenu>
                    <NavMenu
                      placement="rightStart"
                      eventKey="5"
                      title="User"
                      icon={<MagicIcon />}
                    >
                      <NavItem eventKey="5-1" onSelect={handleSelect}>
                        User Info
                      </NavItem>
                    </NavMenu>
                    <NavMenu
                      placement="rightStart"
                      eventKey="6"
                      title="Warehouse"
                      icon={<MagicIcon />}
                    >
                      <NavItem eventKey="6-1" onSelect={handleSelect}>
                        Warehouse Availability
                      </NavItem>
                      <NavItem eventKey="6-2" onSelect={handleSelect}>
                        Assign Drivers
                      </NavItem>
                    </NavMenu>
                    <NavMenu
                      placement="rightStart"
                      eventKey="7"
                      title="Employee"
                      icon={<MagicIcon />}
                    >
                      <NavItem eventKey="7-1" onSelect={handleSelect}>
                        Employee Management
                      </NavItem>
                      <NavItem eventKey="7-2" onSelect={handleSelect}>
                        Access
                      </NavItem>
                    </NavMenu>
                    <NavMenu
                      placement="rightStart"
                      eventKey="8"
                      title="Finance"
                      icon={<MagicIcon />}
                    >
                      <NavItem eventKey="8-1" onSelect={handleSelect}>
                        Quotation
                      </NavItem>
                      <NavItem eventKey="8-2" onSelect={handleSelect}>
                        Payment
                      </NavItem>
                    </NavMenu>
                  </Nav>
                </Sidenav.Body>
                <Sidenav.Toggle
                  expanded={expanded}
                  onToggle={(expanded) => setExpanded(expanded)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#ffffff",
                    borderRadius: 0,

                    cursor: "pointer"
                  }} />
              </Sidenav>
            </ScrollableArea>
          </Container>
        </>
      )}
    </>
  );
};

export default SideNav;