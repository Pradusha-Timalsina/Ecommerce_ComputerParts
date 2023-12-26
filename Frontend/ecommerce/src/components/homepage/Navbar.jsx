import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Imported the cart icon
import "./navbar.css";
import logoImage from "../../components/LogoImage/logo.png";

const Navbar = () => {
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
            <Link className="link" to="/electronics">
              Electronics
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
        <BiSearchAlt2 style={{ fontSize: "30px" }} />
        <div className="icon-gap" /> {/* Add a div for spacing */}
        <AiOutlineShoppingCart style={{ fontSize: "28px" }} />{" "}
        {/* Add the cart icon */}
        <div className="icon-gap" /> {/* Add another div for spacing */}
        <Link to="/login">
          <CgProfile
            style={{ fontSize: "28px" }}
            onClick={handleProfileClick}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
