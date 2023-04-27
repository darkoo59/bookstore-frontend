import React from "react";
import Logo from "../images/logo.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon  from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from '@mui/icons-material/Logout';
import CommentRoundedIcon  from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { List } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {useIsAuthenticated} from 'react-auth-kit';
import { useSignOut } from 'react-auth-kit'
const Navbar = () => {
  const isAuthenticated = useIsAuthenticated()
  const signOut = useSignOut()
  const [openMenu, setOpenMenu] = React.useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon:<HomeIcon/>
    },
    {
      text: "About",
      icon: <InfoIcon/>
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon/>
    }
  ]

    return (
      <nav>
        <div className="nav-logo-container">
        <img className="logo-resized" src={Logo} alt=""/>
        </div>
        <div className="navbar-links-container">
          <Link to="/">Home</Link>
          {/* {isAuthenticated() ? <Link to="/books">Books</Link> : null} */}
          <Link to="/books">Books</Link>
          {!isAuthenticated() ? <Link to="/registration">Registration</Link> : null}
          {!isAuthenticated() ? <Link to="/login">Login</Link> : null}
          {isAuthenticated() ? <LogoutIcon className='logout-icon' onClick={() => signOut()}></LogoutIcon> : null}
          {/* <a href="">
            <BsCart2 className="navbar-cart-icon"/>
          </a> */}
          </div>
          <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={() => setOpenMenu(true)}/>
          </div> 
          <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
            <Box sx={{width: 250}} role="presentation" onClick={()=>setOpenMenu(false)} onKeyDown={() => setOpenMenu(false)}>
              <List>
                {
                  menuOptions.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                  ))
                }
              </List>
            </Box>
          </Drawer>
      </nav>
          );
  };
  
  export default Navbar;