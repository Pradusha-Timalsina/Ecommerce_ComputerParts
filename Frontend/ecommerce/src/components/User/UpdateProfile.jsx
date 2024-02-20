import React from "react";
import { Fragment, useState, useEffect } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import "./updateprofile.css";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  //   const updateDetailsSubmit = (e) => {
  //     e.preventDefault();
  //     const form = new FormData();
  //     form.set('firstName', firstName);
  //     form.set('lastName', lastName);
  //     form.set('email', email);
  //     form.set('address', address);
  //     form.set('contact', contact);
  //     if (avatar) {
  //       form.set('avatar', avatar);
  //     }
  //     dispatch(editProfileDetails(form));
  //   };

  //   const updateDetailsHandleChange = (e) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   };

  //   useEffect(() => {
  //     if (user) {
  //       setFirstName(user.firstName);
  //       setLastName(user.lastName);
  //       setAddress(user.address);
  //       setContact(user.contact);
  //       setEmail(user.email);
  //       setAvatarPreview(user.avatar?.url);
  //     }

  //     if (error) {
  //       alert.error(error);
  //       dispatch(errorClear());
  //     }

  //     if (isUpdated) {
  //       alert.success('Profile Updated Successfully');
  //       dispatch(userLoad());

  //       dispatch({ type: UPDATE_DETAILS_RESET });
  //     }
  //   }, [dispatch, error, alert, user, isUpdated]);

  return (
    <Fragment>
      <div className="updateCon">
        <div className="updateprofile">
          <h2 className="updateH2">Update Details</h2>
          <form className="updateProfileForm" encType="multipart/form-data">
            {" "}
            <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input type="file" name="avatar" accept="image/*" />
            </div>
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="firstName"
                required
                name="firstName"
              />
            </div>
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="lastName"
                required
                name="lastName"
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input type="email" placeholder="Email" readOnly name="email" />
            </div>
            <div className="updateProfileName">
              <LocationCityIcon />
              <input
                type="text"
                placeholder="address"
                required
                name="address"
              />
            </div>
            <div className="updateProfileName">
              <SmartphoneIcon />
              <input
                type="number"
                placeholder="contact"
                required
                name="contact"
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
