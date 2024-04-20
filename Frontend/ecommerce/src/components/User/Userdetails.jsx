import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./userdetails.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import moment from "moment";
import { useSelector } from "react-redux";
import UserOrder from "../Orders/UserOrder";


const Userdetails = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const date = moment(user?.createdAt);
  const formattedDate = date.format("MMM D, YYYY");

  const fullName = `${user && user.name} `;

  return (
    <Fragment>
      <div className="accountContainer">
        <div className="myAccount">
          <h1>My Account</h1>
          {/* <img src={user.avatar?.url} alt={user.name} /> */}

          {/* verified profile start*/}

          <div className="profileContainer">
            <Avatar
              className="profileAvatar"
              src={user.avatar?.url}
              style={{ width: "150px", height: "150px" }}
            />
            <div className="userWappper">
              <span className="username">{fullName} </span>
              <VerifiedIcon className="verified-icon" color="primary" />
            </div>

            <div className="userDetails">
              <span className="item-title">Account Details</span>
              <Link
                to="/user/update/profile"
                style={{ textDecoration: "none" }}
              >
                <button>Edit</button>
              </Link>
              <div className="item">
                <EmailIcon className="iconE" />
                <span className="data">{user?.email}</span>
              </div>

              <div className="item">
                <LocationCityIcon className="iconE" />
                <span className="data">{user?.address}</span>
              </div>
              <div className="item">
                <SmartphoneIcon className="iconE" />
                <span className="data">{user?.contact}</span>
              </div>

              <span className="item-title">Joined date: {formattedDate}</span>
              <div className="buttons">
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>

          {/* verified profile end*/}
        </div>
        {user && user.role !== "admin" ? (
  <div className="second">
    <UserOrder />
  </div>
) : null}
        
      </div>
    </Fragment>
  );
};

export default Userdetails;
