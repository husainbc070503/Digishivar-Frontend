import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import logo from "../assets/logo.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SideDrawer from "./SideDrawer";
import WishListIcon from "@mui/icons-material/Favorite";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Badge } from "@mui/material";

const Navbar = () => {
  const { user, handleLogout, cart } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ padding: "5px 0" }}>
        <Toolbar>
          {user?.user?.role === "admin" && <SideDrawer />}

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="logo" />
            </div>
            <Typography fontSize={30} sx={{ color: "white" }} ml={1}>
              Digishivar
            </Typography>
          </Box>

          <div className="nav-icon">
            {!open ? (
              <MenuIcon className="fs-5" onClick={() => setOpen(!open)} />
            ) : (
              <CloseIcon className="fs-5" onClick={() => setOpen(!open)} />
            )}
          </div>

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <div className={`links ${open && "open"}`}>
            {user?.user ? (
              user?.user?.role === "farmer" ? (
                <>
                  <NavLink to="../blogs" className="nav-link">
                    Blogs
                  </NavLink>
                  <NavLink to="../addProduct" className="nav-link">
                    Add Product
                  </NavLink>
                  <NavLink to="../orders" className="nav-link">
                    Orders
                  </NavLink>
                  <Typography
                    className="Typography nav-text"
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </>
              ) : user?.user?.role === "admin" ? (
                <>
                  <NavLink to="../profile" className="nav-link">
                    Profile
                  </NavLink>
                  <Typography
                    className="Typography nav-text"
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </>
              ) : (
                <>
                  <NavLink to="../profile" className="nav-link">
                    Profile
                  </NavLink>
                  <NavLink to="../readblogs" className="nav-link">
                    Blogs
                  </NavLink>
                  <NavLink to="../cart" className="nav-link">
                    <Badge badgeContent={cart.length} color="secondary">
                      <ShoppingCartCheckoutIcon />
                    </Badge>
                  </NavLink>

                  <NavLink to="../wishlist" className="nav-link">
                    <WishListIcon />
                  </NavLink>
                  <Typography
                    className="Typography nav-text"
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </>
              )
            ) : (
              <Button variant="contained" color="secondary">
                <NavLink to="auth" className="nav-link-login">
                  Login
                </NavLink>
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
