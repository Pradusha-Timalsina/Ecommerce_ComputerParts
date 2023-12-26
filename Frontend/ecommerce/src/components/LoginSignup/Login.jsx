import React, { Fragment } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Fragment>
      <div className="login_container">
        <div className="login_form_container">
          <div className="left">
            {/* <p className="verified_message">
                  Email verified. You can now login.
                </p> */}

            <form className="form_container">
              <h1>Login to Your Account</h1>
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

              <Link to="/password/forgot" style={{ alignSelf: "flex-start" }}>
                <p style={{ padding: "0 12px" }}>Forgot Password ?</p>
              </Link>

              <button type="submit" className="green_btn">
                Sign In
              </button>
            </form>
          </div>
          <div className="right">
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className="white_btn">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
