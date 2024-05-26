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
import { saveShippingInfo } from "../../../actions/cartAction";
import Footer from "../../Footer/Footer"
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const FullName = `${user && user.name}`;
  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [contact, setContact] = useState(
    shippingInfo?.contact || user?.contact
  );
  const [province, SetProvince] = useState(
    shippingInfo?.province || "Bagmati Province"
  );
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (user.role === "admin") {
      // alert.error("You are not authorized to order items.");
      return;
    }
    if (contact.length < 10 || contact.length > 10) {
      // alert.error("Phone Number should be 10 digit Long");
      return;
    }
    dispatch(
      saveShippingInfo({
        FullName,
        address,
        city,
        contact,
        province,
        shippingInfo,
      })
    );
    navigate("/order/details");
  };
  return (
    <Fragment>
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="shhpingAddress">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                name="firstName"
                required
                readOnly
                value={FullName}
              />
            </div>
            <div className="shhpingAddress">
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                size="10"
              />
            </div>

            <div className="shhpingAddress">
              <LocationCityIcon />
              <input
                type="text"
                placeholder="Province"
                required
                readOnly
                value={province}
                onChange={(e) => SetProvince(e.target.value)}
              />
            </div>
            <div className="shhpingAddress">
              <LocationCityIcon />
              <select
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="city">Select City</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>
            </div>
            <div className="shhpingAddress">
              <HomeIcon />
              <input
                type="text"
                placeholder="Shipping Full Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Next"
              className="shippingBtn"
              disabled={address ? false : true}
            />
          </form>
        </div>
      </div>
  
    </Fragment>
  );
};

export default Shipping;
