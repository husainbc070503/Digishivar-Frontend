import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
<<<<<<< HEAD
// import Button from "@mui/material/Button";
// import { NavLink } from "react-router-dom";
// import { useGlobalContext } from "../contexts/AppContext";
// import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

const Navbar = () => {
  // const { user, handleLogout } = useGlobalContext();
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  // const handleCloseUserMenu = () => setAnchorElUser(null);
=======
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const { user, handleLogout } = useGlobalContext();
  const navigate = useNavigate();
>>>>>>> 3606a52b11bddffb7b5584e91121183ea7dd7490

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ padding: "5px 0" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="logo" />
            </div>
            <Typography fontSize={30} sx={{ color: "white" }} ml={1}>
              Digishivar
            </Typography>
          </Box>

<<<<<<< HEAD
          {/* {user?.user ? (
            <NavLink to="/" className="nav-link">
              Profile
            </NavLink>
=======
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          {user?.user ? (
            <>
              {user?.user?.role === "farmer" && (
                <>
                  <NavLink to="../blogs" className="nav-link">
                    Blogs
                  </NavLink>
                  <NavLink to="../addProduct" className="nav-link">
                    Add Product
                  </NavLink>
                </>
              )}
              <NavLink to="../myProfile" className="nav-link">
                Profile
              </NavLink>
              <Typography
                className="Typography nav-text"
                onClick={handleLogout}
              >
                Logout
              </Typography>
            </>
>>>>>>> 3606a52b11bddffb7b5584e91121183ea7dd7490
          ) : (
            <Button variant="contained" color="secondary">
              <NavLink to="auth" className="nav-link-login">
                Login
              </NavLink>
            </Button>
          )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
