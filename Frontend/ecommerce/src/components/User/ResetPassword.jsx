import React, { Fragment, useState, useEffect } from "react";
import "./updatePassword.css";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import EyeOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordInput from "../LoginSignup/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      // alert.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);

  return (
    <Fragment>
      <div class="updateConn">
        <div class="updatepass">
          <div class="updatePBox">
            <h2 class="updatePH2">Reset Password</h2>
            <form class="updatePassForm" onSubmit={resetPasswordSubmit}>
              <div class="inputWrapper">
                <div class="inputWithIcon">
                  <PasswordInput
                    type="password"
                    class="text"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="New Password"
                    required
                  />
                </div>
              </div>

              <div class="inputWrapper">
                <div class="inputWithIcon">
                  <PasswordInput
                    type="password"
                    class="text"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                </div>
              </div>

              <input type="submit" value="Update" class="updatePassBtn" />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
