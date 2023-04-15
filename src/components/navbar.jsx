import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Jatim-logo.png";
import LogoUser from "../assets/images/avatar1.png";
import useAuthStore from "../context/userAuthStore";
import useNavStore from "../context/userNavStore";
import useAuth from "../hooks/useAuth";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Navbar = () => {
  const { activeNav } = useNavStore();
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const { user } = useAuthStore();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      // className="bg-sky-700"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {user.role === "Admin" &&
          activeNav
            .filter((nav) => nav.Admin)
            .map((nav) => (
              <Link to={nav.href} key={nav.id}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{nav.icon}</ListItemIcon>
                    <ListItemText primary={nav.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );

  // console.log(user)
  return (
    <div className="">
      <nav className="bg-white border-gray-200  shadow px-2 sm:px-4 py-2.5 sticky top-0 bottom-0 left-0 w-full z-20">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className=" hidden sm:flex items-center">
            <img src={Logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">
              Satu Data
            </span>
          </Link>
          <div className="sm:hidden">
            <MenuIcon onClick={toggleDrawer("top", true)} />
            <Drawer
              anchor="top"
              open={state["top"]}
              onClose={toggleDrawer("top", false)}
            >
              {/* {list("top")} */}
            </Drawer>
          </div>
          <div className="flex items-center md:order-2 space-x-3 relative">
            <span>{user.name}</span>
            <button
              type="button"
              className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 border border-gray-200 focus:ring-gray-300 "
              id="user-menu-button"
              onClick={() => setOpen(!open)}
            >
              <img
                src={LogoUser}
                className="w-10 h-10 rounded-full mx-auto"
                alt="user photo"
              />
            </button>
            <div
              className={`z-50 ${
                open ? "flex flex-col" : "hidden"
              }  absolute top-10 right-0  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow `}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 ">
                {/* {console.log(user);} */}
                {user.name}
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate ">
                {user.email}
                </span>
              </div>
              <ul className="py-1" aria-labelledby="user-menu-button">
                <li>
                  <button
                    className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 "
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
