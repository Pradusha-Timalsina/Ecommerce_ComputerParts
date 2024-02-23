import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import FaceIcon from "@mui/icons-material/Face";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutStep";

const Shipping = () => {
  return (
    <Fragment>
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form className="shippingForm" encType="multipart/form-data">
            <div className="shhpingAddress">
              <FaceIcon />
              <input type="text" placeholder="Name" name="firstName" required />
            </div>
            <div className="shhpingAddress">
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                size="10"
              />
            </div>

            <div className="shhpingAddress">
              <LocationCityIcon />
              <input type="text" placeholder="Province" required readOnly />
            </div>
            <div className="shhpingAddress">
              <LocationCityIcon />
              <select required>
                <option value="city">Select City</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>
            </div>
            <div className="shhpingAddress">
              <HomeIcon />
              <input type="text" placeholder="Shipping Full Address" required />
            </div>
            <input type="submit" value="Next" className="shippingBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
