import express from "express";
import {
  editProfile,
  getBuyCourse,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", authUser, logoutUser);
userRouter.get("/getprofile", authUser, getProfile);
userRouter.post(
  "/editprofile",
  upload.single("userPic"),
  authUser,
  editProfile
);
userRouter.get("/getbuycourse", authUser, getBuyCourse);

export default userRouter;
