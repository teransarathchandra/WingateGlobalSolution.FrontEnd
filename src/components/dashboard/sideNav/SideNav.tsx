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
import IRootState from "@app_interfaces/IRootState";
import { useSelector } from "react-redux";

const SideNav = () => {
  const { employee } = useSelector((state: IRootState) => state.auth);

  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const toggleExpanded = () => setExpanded(!expanded);

  type Expand = {
    expanded: boolean;
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
              defaultOpenKeys={["1", "2", "3"]}
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
                <Nav activeKey={activeKey} onSelect={setActiveKey}>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="1"
                    title="Customers"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="1-1">Customer Info</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="2"
                    title="Orders"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="2-1">Order Info</Nav.Item>
                    <Nav.Item eventKey="2-1">
                      Restricted Order Approval
                    </Nav.Item>
                    <Nav.Item eventKey="2-1">Dummy Option</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="3"
                    title="Customer Information"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="3-1">Customer Information</Nav.Item>
                    <Nav.Item eventKey="3-2">Customer Information</Nav.Item>
                    <Nav.Item eventKey="3-3">Customer Information</Nav.Item>
                    <Nav.Item eventKey="3-4">Customer Information</Nav.Item>
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
