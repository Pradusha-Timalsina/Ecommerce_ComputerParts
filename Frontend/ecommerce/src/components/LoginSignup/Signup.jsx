import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import UploadIcon from "@mui/icons-material/Upload";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userAction";
const Signup = () => {
  const dispatch = useDispatch();
  const [ss, setss] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    contact: "",
    avatar: "",
    avatarPreview: null,
  });
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const { name, email, password, confirmPassword, address, contact } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [passwordError, setPasswordError] = useState("");
  const registerSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordError(" Password should be at least 8 Characters");
    }
    if (password !== confirmPassword) {
      setPasswordError("Password does not match");
      return;
    }
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    myForm.set("address", address);
    myForm.set("contact", contact);
    myForm.set("image", ss);

    // for (let key of myForm.keys()) {
    //   console.log(key + ': ' + myForm.get(key));
    // }
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      setss(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <Fragment>
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="right">
            <form
              className="form_container"
              onSubmit={registerSubmit}
              encType="multipart/form-data"
            >
              <h2>Create Account</h2>

              <div className="signUpName">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={registerDataChange}
                  value={name}
                  required
                  className="nameinput"
                />
              </div>

              <div className="signUpName">
                <input
                  type="email"
                  placeholder="Email "
                  name="email"
                  onChange={registerDataChange}
                  value={email}
                  required
                  className="input"
                />
              </div>
              <div className="signUpName">
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={registerDataChange}
                  value={address}
                  required
                  className="input"
                />
              </div>
              <div className="signUpName">
                <input
                  type="Number"
                  placeholder="Contacts"
                  name="contact"
                  onChange={registerDataChange}
                  value={contact}
                  required
                  className="input"
                  size="10"
                />
              </div>

              <div className="signUpName">
                <PasswordInput
                  placeholder="Password"
                  name="password"
                  onChange={registerDataChange}
                  value={password}
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
                  onChange={registerDataChange}
                  value={confirmPassword}
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

              {/* <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" accept="image/*" />
              </div> */}

              <div
                id="registerImage"
                style={{ position: "relative", display: "inline-block" }}
              >
                <input
                  type="text"
                  placeholder="Choose a file..."
                  value={selectedFile ? selectedFile.name : ""}
                  readOnly
                  className="inputImg"
                  // style={{ paddingRight: "30px" }}
                />
                <UploadIcon
                  onClick={handleBrowseClick}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "25px",
                    cursor: "pointer",
                    backgroundColor: "#dee3e2",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="file"
                  id="fileInput"
                  name="avatar"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={registerDataChange}
                />
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
