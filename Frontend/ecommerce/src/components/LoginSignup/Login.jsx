import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import PasswordInput from "./PasswordInput";

const Login = () => {
  return (
    <Fragment>
      <div className="login_container">
        <div className="login_form_container">
          <div className="left">
            {/* {verified && (
                <p className={styles.verified_message}>
                  Email verified. You can now login.
                </p>
              )} */}
            <form className="form_container">
              <div>
                <h1>Login</h1>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="input"
                />
              </div>
              <div>
                <PasswordInput
                  type="password"
                  placeholder="Password"
                  required
                  className="input"
                />
              </div>
              <Link
                to="/forgot/password"
                style={{ alignSelf: "flex-start", textDecoration: "none" }}
              >
                <p style={{ padding: "0 12px" }}>Forgot Password ?</p>
              </Link>

              <button type="submit" className="green_btn">
                Login
              </button>

              <div className="aregister">
                <span className="aregister_span">
                  New Here?{" "}
                  <Link
                    className="alogin"
                    to="/signup"
                    style={{ textDecoration: "none" }}
                  >
                    SignUp
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
