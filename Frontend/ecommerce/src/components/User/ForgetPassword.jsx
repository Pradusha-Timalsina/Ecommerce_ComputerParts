import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "./forgetpassword.css";
import { clearErrors, forgotPassword } from "../../actions/userAction";

export const ForgetPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      // alert.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      <h1 className="forgotpass">Forgot Password</h1>
      <div className="forgotMainPassword">
        <div className="forgotPassword">
          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                className="inputs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Send" className="forgotPasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
