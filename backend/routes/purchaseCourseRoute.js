import express from "express";
import { authUser } from "../middleware/authUser.js";
import {
  completeTransaction,
  createCheckOutSession,
  getAllPurchaseCourse,
  getCourseLecture,
  getPurchaseCourse,
} from "../controllers/purchaseCourseController.js";

const purchaseCourseRoute = express.Router();

purchaseCourseRoute.post("/createcheckout", authUser, createCheckOutSession);
purchaseCourseRoute.post("/completetransaction", authUser, completeTransaction);
purchaseCourseRoute.get(
  "/purchasestatus/:courseId",
  authUser,
  getPurchaseCourse
);
purchaseCourseRoute.get(
  "/getallpurchasecourse",
  authUser,
  getAllPurchaseCourse
);
purchaseCourseRoute.get(
  "/getcourselecture/:courseId",
  authUser,
  getCourseLecture
);

export default purchaseCourseRoute;
