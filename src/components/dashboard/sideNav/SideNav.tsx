import { useState } from "react";
import { Sidenav, Nav } from "rsuite";
// import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
// import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
// import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import "rsuite/Sidenav/styles/index.css";
import "rsuite/Nav/styles/index.css";
import { Overlay } from "@app_styles/shared/overlay.styles";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "@app_assets/images/logo.png";
import { useActiveAuthContext } from "@app_contexts/authActiveContext";
import { useNavigate } from "react-router-dom";
import { canAccess } from "@app_services/employeeService";
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext";
import toastUtil from '@app_utils/toastUtil'

const SideNav = () => {
  // const { employee } = useSelector((state: IRootState) => state.auth);
  const navigate = useNavigate();
  const { isEmployee } = useActiveAuthContext();

  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const { employee } = useEmployeeAuthContext();
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
      console.log("Side", employee)
      const route = eventKeyMapping(eventKey);
      const accessData = {
        token: employee.accessToken,
        destination: route
      }
      toastUtil.info("Waiting For Access!");
      await canAccess(accessData);
      navigate(route);
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
    };
    return mapping[eventKey] || '/';
  };

  const Container = styled.div<Expand>`
    width: 300px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    display: ${({ expanded }) => (expanded ? "block" : "none")};
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
      {/* <Overlay show={expanded} onClick={() => setExpanded(false)} /> */}
      {expanded && (
        <>
          <Overlay show={expanded} onClick={() => setExpanded(false)} />
          <Container expanded={expanded}>
            <Sidenav
              // defaultOpenKeys={["1", "2", "3", "4", "5", "6"]}
              style={{ minHeight: "100vh" }}
            >
              <Sidenav.Header
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={logo}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
              </Sidenav.Header>
              <Sidenav.Body>
                <Nav activeKey={activeKey}>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="1"
                    title="Order"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="1-1" onSelect={handleSelect}>Order Management</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="2"
                    title="Restricted Order"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="2-1" onSelect={handleSelect}>Restricted Orders</Nav.Item>
                    <Nav.Item eventKey="2-2" onSelect={handleSelect}>Restricted Order Types</Nav.Item>
                    <Nav.Item eventKey="2-3" onSelect={handleSelect}>Country Info</Nav.Item>
                    <Nav.Item eventKey="2-4" onSelect={handleSelect}>Category Info</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="3"
                    title="Transport"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="3-1" onSelect={handleSelect}>Order Aggregation</Nav.Item>
                    <Nav.Item eventKey="3-2" onSelect={handleSelect}>Bulk Details</Nav.Item>
                    <Nav.Item eventKey="3-3" onSelect={handleSelect}>Bulk</Nav.Item>
                    <Nav.Item eventKey="3-4" onSelect={handleSelect}>Flight</Nav.Item>
                    <Nav.Item eventKey="3-5" onSelect={handleSelect}>Airline</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="4"
                    title="Customer"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="4-1" onSelect={handleSelect}>Customer Info</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="5"
                    title="User"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="5-1" onSelect={handleSelect}>User Info</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="6"
                    title="Warehouse"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="6-1" onSelect={handleSelect}>Warehouse Availability</Nav.Item>
                    <Nav.Item eventKey="6-2" onSelect={handleSelect}>Assign Drivers</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="7"
                    title="Employee"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="7-1" onSelect={handleSelect}>Employee Management</Nav.Item>
                    <Nav.Item eventKey="7-2" onSelect={handleSelect}>Employee Access</Nav.Item>
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
              <Sidenav.Toggle
                expanded={expanded}
                onToggle={(expanded) => setExpanded(expanded)}
              />
            </Sidenav>
          </Container>
        </>
      )}
    </>
  );
};

export default SideNav;
