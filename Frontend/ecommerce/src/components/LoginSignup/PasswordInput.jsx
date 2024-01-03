import React, { useState } from "react";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import EyeOffIcon from "@mui/icons-material/VisibilityOff";
import "./passinput.css";

const PasswordInput = ({ name, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password_input">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="passinput"
        required
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          handleShowPassword();
        }}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};

export default PasswordInput;
