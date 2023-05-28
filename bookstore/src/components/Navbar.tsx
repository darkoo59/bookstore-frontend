import { List } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import React from "react";
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { HiOutlineBars3 } from "react-icons/hi2";
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const [openMenu, setOpenMenu] = React.useState(false);
  const navigate = useNavigate();

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img className="logo-resized" src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <Link to="/">Home</Link>
        {/* {isAuthenticated() ? <Link to="/books">Books</Link> : null} */}
        <Link to="/books">Books</Link>
        {!isAuthenticated() ? (
          <Link to="/registration">Registration</Link>
        ) : null}
        {!isAuthenticated() ? <Link to="/login">Login</Link> : null}
        {isAuthenticated() ? <Link to="/orders">My orders</Link> : null}
        {isAuthenticated() && (
          <Link to="/recommendations">Recommendations</Link>
        )}
        {isAuthenticated() && cartQuantity > 0 ? (
          <Button
            onClick={openCart}
            style={{
              width: "3rem",
              height: "3rem",
              position: "relative",
              color: "black",
              marginRight: "25px",
            }}
            variant="outlined"
            className="rounded-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 876 612"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>

            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        ) : null}
        {isAuthenticated() ? (
          <LogoutIcon
            className="ml-auto"
            onClick={() => {
              signOut();
              navigate("/login");
            }}
          ></LogoutIcon>
        ) : null}
        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          anchor="right"
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
