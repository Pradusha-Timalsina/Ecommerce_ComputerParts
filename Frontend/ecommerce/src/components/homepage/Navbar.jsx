import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Imported the cart icon
import "./navbar.css";
import logoImage from "../../components/LogoImage/logo.png";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  Button,
  Badge,
} from "@mui/material";

import Login from "@mui/icons-material/Login";
import { logout } from "../../actions/userAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const fullName = `${user && user.name}`;

  const logoutHandler = () => {
    dispatch(logout());
    // alert.success("Logged out SuccessFully");
  };

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/login");
  };
  return (
    <nav className="main-nav">
      <div className="logo">
        <Link to="/">
          <img
            src={logoImage}
            style={{
              width: "120px",
            }}
          />
        </Link>
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/comparison/page">
              Comparison
            </Link>
          </li>
          <li>
            <Link className="link" to="/category">
              Category
            </Link>
          </li>
        </ul>
      </div>
      <div className="profile">
        <BiSearchAlt2 style={{ fontSize: "25px" }} />
        {/* <div className="icon-gap" /> */}
        <Link
          to="/shopping/cart"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Badge badgeContent={`${cartItems.length}`} color="primary">
            <AiOutlineShoppingCart style={{ fontSize: "25px" }} />{" "}
          </Badge>
        </Link>
        {/* <div className="icon-gap" />  */}
        <FormControl variant="standard">
          {user ? (
            <Select
              value={fullName}
              sx={{
                width: "60px",
                borderRadius: "0.25rem",
                p: "0.20rem 0.3rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.20rem",
                  width: "1rem",
                },
                "& .MuiSelect-select:focus": {},
                fontSize: "0.55rem",
              }}
              // input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <h3>{fullName}</h3>
              </MenuItem>
              {user && user.role !== "admin" ? (
                <Link
                  to="/myorder"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <MenuItem> My Orders</MenuItem>
                </Link>
              ) : (
                <Link
                  to="/admin/dashboard"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <MenuItem> DashBoard</MenuItem>
                </Link>
              )}
              <Link
                to="/user/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <MenuItem> My Account</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "red" }}
                onClick={logoutHandler}
              >
                <MenuItem> Logout</MenuItem>
              </Link>
            </Select>
          ) : (
            !loading && (
              <Button
                variant="contained"
                endIcon={<Login />}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )
          )}
        </FormControl>
      </div>
    </nav>
  );
};

export default Navbar;
