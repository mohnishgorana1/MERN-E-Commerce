import cloudinary, { v2 } from "cloudinary";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import crypto from "crypto";
import { User } from "../models/user.model.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7day
  httpOnly: true,
  secure: true,
};

export const register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
    phone,
    address,
  } = req.body;

  if (
    !username ||
    !email ||
    !firstName ||
    !lastName ||
    !password ||
    !confirmPassword ||
    !phone ||
    !address
  ) {
    res.status(400).json({ error: "All Fields are required" });
  }

  if (password !== confirmPassword) {
    res
      .status(400)
      .json({ error: "Password and Confirm Password Don't match" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ error: "Email Already Exists" });
  }

  const newUser = await User.create({
    username,
    email,
    password,
    profile: {
      firstName: firstName,
      lastName: lastName,
      avatar: {
        public_id: "",
        secure_url: "",
      },
      contact: {
        phone: phone,
        address: address,
      },
    },
  });
  if (!newUser) {
    res.status(400).json({ error: "Registration Failed!" });
  }

  // file
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "E-Commerce",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        newUser.profile.avatar.public_id = result.public_id;
        newUser.profile.avatar.secure_url = result.secure_url;

        //remove file from local system
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      res.status(500, "File not uploaded, Please try again!");
    }
  }

  await newUser.save();
  const token = await newUser.jwtToken();

  newUser.password = undefined;
  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "User Registered SuccessFully",
    newUser,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const myPassword = password[0];

  if (!email || !password) {
    res.status(400).json({ error: "All Fields are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || (await !user.comparePassword(myPassword))) {
      res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = await user.jwtToken();
    console.log("token", token);
    user.password = undefined;

    // res.cookie("token", token, cookieOptions);
    // console.log("user: ", user);
    res.status(200).json({
      success: true,
      message: "Login Success",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User Details",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
export const updateProfile = async (req, res, next) => {
  const { firstName, lastName, username } = req.body;
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    res.status(400).json({ message: "User Does not Exists" });
  }

  if (firstName) {
    user.profile.firstName = firstName;
  }
  if (lastName) {
    user.profile.lastName = lastName;
  }
  if (username) {
    user.username = username;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.profile.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "E-Commerce", // Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: "faces", // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: "fill",
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in DB
        user.profile.avatar.public_id = result.public_id;
        user.profile.avatar.secure_url = result.secure_url;
        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User details updates successfully",
    user,
  });
};
