import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import FaceIcon from "@mui/icons-material/Face";
import "./signup.css";

const Signup = () => {
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [passwordError, setPasswordError] = useState("");
  // const [data, setData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   address: "",
  //   contact: "",
  //   avatar: "",
  //   avatarPreview: null,
  // });

  // const {
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   confirmPassword,
  //   address,
  //   contact,
  // } = data;

  // const [avatar, setAvatar] = useState("/profile.png");
  // const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  // const [passwordError, setPasswordError] = useState("");

  return (
    <Fragment>
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="right">
            <form className="form_container">
              <h2>Create Account</h2>
              <div className="nameInRow">
                <div className="signUpName">
                  <FaceIcon className="icon" />
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    required
                    className="nameinput"
                  />
                </div>
                <div className="signUpName">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    required
                    className="nameinput"
                  />
                  <FaceIcon className="icon" />
                </div>
              </div>
              <div className="signUpName">
                <MailOutlineIcon className="icon" />
                <input
                  type="email"
                  placeholder="Email "
                  name="email"
                  required
                  className="input"
                />
              </div>
              <div className="signUpName">
                <LocationCityIcon className="icon" />
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  required
                  className="input"
                />
              </div>
              <div className="signUpName">
                <SmartphoneIcon className="icon" />
                <input
                  type="Number"
                  placeholder="Contacts"
                  name="contact"
                  required
                  className="input"
                  size="10"
                />
              </div>

              <div className="signUpName">
                <PasswordInput
                  placeholder="Password"
                  name="password"
                  required
                />
              </div>
              {passwordError && (
                <div
                  className="error_message"
                  style={{
                    fontSize: "0.5rem",
                    alignItems: "flex-start",
                    color: "red",
                  }}
                >
                  {passwordError}
                </div>
              )}

              <div className="signUpName">
                <PasswordInput
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                />
              </div>
              {passwordError && (
                <div
                  className="error_message"
                  style={{
                    fontSize: "0.5rem",

                    color: "red",
                  }}
                >
                  {passwordError}
                </div>
              )}

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" accept="image/*" />
              </div>

              <button type="submit" className="green_btn">
                Sign Up
              </button>

              <div className="aregister">
                <span className="aregister_span">
                  Already Register?{" "}
                  <Link
                    className="alogin"
                    to="/login"
                    style={{ textDecoration: "none" }}
                  >
                    Login Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default Signup;
