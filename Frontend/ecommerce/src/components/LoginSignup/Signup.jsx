import { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [passwordError, setPasswordError] = useState("");

  return (
    <div className="img">
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="left_signup">
            <h1> Welcome Back</h1>
            <Link to="/login">
              <button type="button" className="white_btn">
                Sign in
              </button>
            </Link>
          </div>
          <div className="right_signup">
            <form className="form_container" encType="multipart/form-data">
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                required
                className="input"
              />

              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                required
                className="input"
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                className="input"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                className="input"
              />
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
              <input
                type="text"
                placeholder="Address"
                name="address"
                required
                className="input"
              />
              <input
                type="number"
                placeholder="Contact"
                name="contact"
                required
                className="input"
              />
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" accept="image/*" />
              </div>
              <button type="submit" className="green_btn">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
