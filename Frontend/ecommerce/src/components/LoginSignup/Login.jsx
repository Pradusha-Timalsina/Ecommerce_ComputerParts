import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import PasswordInput from "./PasswordInput";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import Alertbar from "../Alert/Alert";
// import { useAlert } from "react-alert";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const alert = useAlert();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  // for Alertbar of Snackbar

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setMessage("Validation Error");
      setStatus("error");
      setOpen(true);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/"); // Redirect to default dashboard or homepage
      setMessage("Login Successfully");
      setStatus("success");
      setOpen(true);
    }
  }, [dispatch, error, isAuthenticated, navigate]);

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
                to="/forget/password"
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
              <Alertbar
                message={message}
                status={status}
                open={open}
                handleClose={handleClose}
              />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
