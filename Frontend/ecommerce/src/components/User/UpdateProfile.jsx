import React from "react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import "./updateprofile.css";
import { loadUser, clearErrors, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const [Fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.set("Fullname", Fullname);
    form.set("email", email);
    form.set("address", address);
    form.set("contact", contact);
    if (image) {
      form.set("image", image);
    }
    dispatch(updateProfile(form));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      setImage(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const updateProfileDataChange = (e) => {
  //   if (e.target.name === "avatar") {
  //     setImage(e.target.files[0]);
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address);
      setContact(user.contact);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url);
    }

    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, user, isUpdated]);

  return (
    <Fragment>
      <h2 className="updateH2">Update Profile</h2>
      <div className="updateCon">
        <div className="updateprofile">
          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            {" "}
            <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                value={Fullname}
                required
                name="Fullname"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                name="email"
                readOnly
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="updateProfileName">
              <LocationCityIcon />
              <input
                type="text"
                placeholder="address"
                value={address}
                required
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="updateProfileName">
              <SmartphoneIcon />
              <input
                type="number"
                placeholder="contact"
                value={contact}
                required
                name="contact"
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <input type="submit" value="Update" className="updateProfileBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
