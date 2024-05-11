import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  styled,
  InputBase,
} from "@mui/material";
import Login from "@mui/icons-material/Login";
import { logOut } from "../../actions/userAction";
import Alertbar from "../Alert/Alert";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(-50), // Adjusted spacing
  marginRight: theme.spacing(1), // Adjusted spacing
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1), // Adjusted padding
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  borderRadius: theme.shape.borderRadius, // Rounded edges
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const fullName = `${user && user.name}`;
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
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

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
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
        </ul>
      </div>
      <div className="profile">
        {/* <BiSearchAlt2 style={{ fontSize: "25px" }} /> */}
        {/* <BiSearchAlt2 style={{ fontSize: "25px", cursor: "pointer" }} /> */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            onChange={(e) => setKeyword(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
          <Button onClick={searchSubmitHandler}> Search</Button>
        </Search>

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
                ""
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
