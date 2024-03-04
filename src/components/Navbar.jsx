import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

const Navbar = () => {
  const { user, handleLogout } = useGlobalContext();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography fontSize={30} sx={{ flexGrow: 1, color: "white" }}>
            Digishivar
          </Typography>

          {user?.user ? (
            <NavLink to="/" className="nav-link">
              Profile
            </NavLink>
          ) : (
            <Button variant="contained" color="secondary">
              <NavLink to="auth" className="nav-link-login">
                Login
              </NavLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
