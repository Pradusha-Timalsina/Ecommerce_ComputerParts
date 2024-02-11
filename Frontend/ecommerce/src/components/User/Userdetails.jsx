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
              src="https://images.nvidia.com/aem-dam/Solutions/geforce/news/geforce-rtx-graphics-cards/geforce-rtx-2080-technical-photography-angled-003.png"
              style={{ width: "190px", height: "190px" }}
            />
            <div className="userWappper">
              <span className="username">{fullName} </span>
              <VerifiedIcon className="verified-icon" color="primary" />
            </div>

            <div className="userDetails">
              <span className="item-title">Account Details</span>
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
            </div>
          </div>

          {/* verified profile end*/}
        </div>

        <div className="second">
          <h3>Manage My Account</h3>
          <div className="personalProfile">
            <Link to="/update/profile" style={{ textDecoration: "none" }}>
              <button className="editButton">Edit Profile</button>
            </Link>
            <div className="buttons">
              <Link to="/myorder">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Userdetails;
