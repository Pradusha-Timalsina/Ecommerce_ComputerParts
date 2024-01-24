import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import PasswordInput from "./PasswordInput";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
// import { useAlert } from "react-alert";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      // alert.success("Login Successfully");
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);
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
            <form className="form_container" onSubmit={loginSubmit}>
              <div>
                <h1>Login</h1>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLogin(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <PasswordInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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
