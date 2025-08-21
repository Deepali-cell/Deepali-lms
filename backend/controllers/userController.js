import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import { PassThrough } from "stream";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use." });
    }

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email format." });
    }

    if (password.length < 8) {
      return res.status(402).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = { name, email, password: hashPassword };
    const newUser = new userModel(userData);
    await newUser.save();

    const usertoken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ success: true, usertoken });
  } catch (error) {
    console.log("error : ", error);
    res.json({ success: false, message: error });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both email and password are required.",
      });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user found with this email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password." });
    }
    const usertoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userDetail = {
      id: user._id,
      name: user.name,
      email: user.email,
      enrollementCourses: user.enrollementCourses,
      userPic: user.userPic,
    };
    return res
      .cookie("usertoken", usertoken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, usertoken, userDetail });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    return res
      .cookie("usertoken", "", { maxAge: 0 })
      .status(200)
      .json({ success: true, message: "user logout successfully" });
  } catch (error) {
    console.log("Logout error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "profile not found " });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("getprofile error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userPic = req.file;
    const userId = req.userId;

    // Find the user by ID
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Validate name and email
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name are required." });
    }

    // Handle userPic upload to Cloudinary
    const bufferStream = new PassThrough();
    bufferStream.end(userPic.buffer);

    const cloudinaryUpload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "UserPic" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      bufferStream.pipe(stream);
    });

    // Update user details
    user.name = name;
    user.userPic = cloudinaryUpload.secure_url;

    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const getBuyCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const buyCourse = await userModel
      .findById(userId)
      .populate({ path: "enrollementCourses" });
    if (!buyCourse) {
      return res
        .status(404)
        .json({ success: false, message: "no enrollment course found." });
    }
    return res.status(200).json({ success: true, buyCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  editProfile,
  getBuyCourse,
};
