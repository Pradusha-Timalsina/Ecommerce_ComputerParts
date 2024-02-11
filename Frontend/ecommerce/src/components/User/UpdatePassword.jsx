import React, { Fragment, useState, useEffect } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "./updatePassword.css";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../layout/Loader/Loader";
import Navbar from "../homepage/Navbar";
// import { useAlert } from "react-alert";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../LoginSignup/PasswordInput";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  //   const alert = useAlert();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPasswordError(" Password should be at least 8 Characters");
    }
    if (confirmPassword.length < 8) {
      setConfirmPasswordError(" Password should be at least 8 Characters");
    }

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      //   alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      //   alert.success("Password Updated Successfully");
      navigate("/user/profile");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="updateConn">
            <div class="updatepass">
              <div class="updatePBox">
                <h2 class="updatePH2">Update Password</h2>
                <form class="updatePassForm" onSubmit={updatePasswordSubmit}>
                  <div class="inputWrapper">
                    <div class="inputWithIcon">
                      <PasswordInput
                        type="password"
                        placeholder="Old Password"
                        onChange={(e) => setOldPassword(e.target.value)}
                        value={oldPassword}
                        required
                      />
                    </div>
                  </div>

                  <div class="inputWrapper">
                    <div class="inputWithIcon">
                      <PasswordInput
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        required
                      />
                    </div>
                  </div>

                  <div class="inputWrapper">
                    <div class="inputWithIcon">
                      <PasswordInput
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                      />
                    </div>
                  </div>

                  <input type="submit" value="Update" class="updatePassBtn" />
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
