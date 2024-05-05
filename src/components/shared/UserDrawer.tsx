import {
  Avatar,
  Box,
  // Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
// import Settings from "@mui/icons-material/Settings";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Logout from "@mui/icons-material/Logout";
import useAuth from "@app_hooks/useAuth";
import { useState } from "react";
import { useActiveAuthContext } from "@app_contexts/authActiveContext";
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext";
import { useUserAuthContext } from "@app_contexts/childContexts/authUserContext";
import { useNavigate } from "react-router-dom";

const UserDrawer = ({ isVisible }) => {
  const { logoutCurrentUser } = useAuth();
  const navigate = useNavigate();
  const { activeUser, logout, isEmployee } = useActiveAuthContext();
  const { logoutEmployee } = useEmployeeAuthContext();
  const { logoutUser } = useUserAuthContext();

  const firstName = activeUser?.name?.firstName || "Unknown";
  const lastName = activeUser?.name?.lastName || "User";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigateToPortal = () => {
    navigate('/app/portal-welcome');
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const isUserEmployee = isEmployee() || false;
    if (isEmployee() != null) {

      isUserEmployee ? logoutEmployee() : logoutUser();
      logout();
      logoutCurrentUser(isUserEmployee);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {activeUser && (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 40, height: 40 }}>
                  {Array.from(firstName)[0] + Array.from(lastName)[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> {firstName + " " + lastName}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigateToPortal();
              }}
            >
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Portal
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogout();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserDrawer;
