import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Imported the cart icon
import "./navbar.css";
import logoImage from "../../components/LogoImage/logo.png";
import { useSelector, useDispatch } from "react-redux";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  Badge,
  IconButton,
} from "@mui/material";
import Login from "@mui/icons-material/Login";
import { Search } from "@mui/icons-material";
import { logOut } from "../../actions/userAction";
import Alertbar from "../Alert/Alert";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const fullName = `${user && user.name}`;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  // for Alertbar of Snackbar

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const logoutHand = async () => {
    const data = await fetch("/api/v1/logout");
    let result = await data.json();
    setMessage("Logout Successfully");
    setStatus("success");
    setOpen(true);
    navigate("/");
    dispatch(logOut());
  };

  const [keyword, setKeyword] = useState("");

  const [showSearch, setShowSearch] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleIconClick = (e) => {
    // Get icon position
    const rect = e.target.getBoundingClientRect();
    setIconPosition({ x: rect.x, y: rect.y });
    toggleSearch();
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/allProducts/${keyword}`);
    } else {
      navigate("/allProducts");
    }
  };

  return (
    <nav className="main-nav">
      <div className="logo">
        <Link to="/">
          <img
            src={logoImage}
            alt="logo"
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
        {/* <BiSearchAlt2 style={{ fontSize: "25px" }} /> */}
        <BiSearchAlt2
          style={{ fontSize: "25px", cursor: "pointer" }}
          onClick={handleIconClick}
        />
        <div
          className={`search-popup ${showSearch ? "active" : ""}`}
          style={{ left: iconPosition.x + "px", top: iconPosition.y + "px" }}
        >
          <input type="text" placeholder="Search..." />
          {/* You can add additional elements or styling for your search popup */}
        </div>
        {showSearch && (
          <div className="search-popup">
            <input type="text" placeholder="Search..." />
            {/* You can add additional elements or styling for your search popup */}
          </div>
        )}

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
                to="/"
                style={{ textDecoration: "none", color: "red" }}
                // onClick={logoutHand}
              >
                <MenuItem onClick={logoutHand}> Logout</MenuItem>
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
      <Alertbar
        message={message}
        status={status}
        open={open}
        handleClose={handleClose}
      />
    </nav>
  );
};

export default Navbar;
