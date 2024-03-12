import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import Groups2Icon from "@mui/icons-material/Groups2";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MessageIcon from "@mui/icons-material/Message";

const SideDrawer = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <React.Fragment>
        <Button onClick={() => setOpen(true)} color="inherit">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Button>
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(true)}
          PaperProps={{
            sx: {
              width: 240,
              padding: "2rem 10px",
            },
          }}
        >
          <Box
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
          >
            <CloseIcon
              className="icon close-icon-admin-dash"
              onClick={() => setOpen(false)}
            />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold" fontSize={20}>
                        Dashboard
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              {["customers", "farmers", "products", "orders", "qna"].map(
                (text, index) => (
                  <NavLink
                    className="nav-side-link"
                    to={text === "orders" ? "adminOrders" : text}
                  >
                    <ListItem key={text} disablePadding className="ListItem">
                      <ListItemButton>
                        <ListItemIcon className="ListItemIcon">
                          {index === 0 ? (
                            <Groups2Icon className="fs-5" />
                          ) : index === 1 ? (
                            <AgricultureIcon className="fs-5" />
                          ) : index === 2 ? (
                            <ShoppingCartIcon className="fs-5" />
                          ) : index === 3 ? (
                            <PaymentIcon className="fs-5" />
                          ) : (
                            <MessageIcon className="fs-5" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={text[0].toUpperCase() + text.substring(1)}
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                )
              )}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SideDrawer;
