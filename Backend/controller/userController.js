const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const DataUriParser = require("datauri/parser.js");
const path = require("path");
const cloudinary = require("cloudinary");
const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname);
  const uri = parser.format(extName, file.buffer);
  return uri;
};

//Registration and User verification
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const image = req.file;

  console.log(image);
  if (!image) {
    console.error("Error: no avatar image provided");
    return res.status(400).json({ message: "No avatar image provided" });
  }

  const imageData = getDataUri(image);

  const result = await cloudinary.v2.uploader.upload(imageData.content, {
    folder: "register",
    width: 150,
    crop: "scale",
  });
  console.log(result);

  if (!result) {
    console.error("Error: failed to upload image to Cloudinary");
    return res
      .status(500)
      .json({ message: "Error uploading image to Cloudinary" });
  }

  const { name, email, password, address, contact } = req.body;

  // if (password !== confirmPassword) {
  //   return next(new ErrorHandler("Password does not match", 404));
  // }

  
  const user = await User.create({
    name,
    email,
    password,
    address,
    contact,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
      // public_id: 'sample Id',
      // url: 'dpUrl',
    },
  });

  //user ko id liyerw tyo id lai private key diyerw token generate gardeko ho
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATEKEY, {
    expiresIn: "1d",
  });

  const verifyLink = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/verify/${token}`; //yeshle chai URL verification link banaideko ho

  const message = `Please click the following link to verify your email: \n\n ${verifyLink}`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Email Verification`,
      message,
    });
    res.status(200).json({
      sucess: true,
      message: `Email sent to ${user.email} sucessfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error sending verification email. Please try again later",
    });
  }
});

//verify user
exports.verifyUser = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { isVerified: true },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.redirect("http://localhost:3000/login?verified=true");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //Checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

// // Logout User
// exports.logout = catchAsyncErrors(async (req, res, next) => {
//   res.cookies.set("token", {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });

//   res.status(200).json({
//     success: true,
//     message: "logged out",
//   });
// });

//Forget Password
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //Get ResetPassword Token
  const resetToken = user.getresetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`; //yo token vaneko chai mathi generate gareko token ho

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `TechTrove Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        404
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//Get User Details     ->yo chai aafule login gareko xa vane aafno details hernako lagi ho
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  console.log(req.body);
  if (!user) throw ErrorHandler("Cannot upload to cloudinary!", 400);

  const { name, email, address, contact } = req.body;
  user.name = name;
  user.email = email;
  user.address = address;
  user.contact = contact;
  // const avatar = req.body?.avatar;
  // console.log(avatar);
  const image = req.file;

  console.log(image);
  if (!image) {
    console.error("Error: no avatar image provided");
    return res.status(400).json({ message: "No avatar image provided" });
  }

  const imageData = getDataUri(image);
  if (imageData) {
    const result = await cloudinary.v2.uploader.upload(imageData.content, {
      folder: "register",
      width: 150,
      crop: "scale",
    });
    if (user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    user.avatar.public_id = result.public_id;
    user.avatar.url = result.url;
    await user.save();
  } else {
    await user.save();
  }
  // if (avatar) {
  //   const result = await cloudinary.v2.uploader.upload(avatar, {
  //     folder: "register",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   if (user.avatar.public_id) {
  //     await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  //   }
  //   user.avatar.public_id = result.public_id;
  //   user.avatar.url = result.url;
  //   await user.save();
  // } else {
  //   await user.save();
  // }

  return res.status(200).json({ success: true, user });
});

//Get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user (admin)  ->yo chai admin ley user details herna milne ho
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role ---> Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {};

  if (req.body.name) {
    newUserData.name = req.body.name;
  }

  if (req.body.email) {
    newUserData.email = req.body.email;
  }

  if (req.body.role) {
    newUserData.role = req.body.role;
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete User ---> Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  //We'll remove cloudinary later

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
