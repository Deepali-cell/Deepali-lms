import express from "express";
import {
  createCource,
  deleteCourse,
  editCourse,
  getAllCources,
  getCourceById,
  getCourseByCategory,
  getPublishedCourse,
  searchCourse,
  togglePublishCourse,
} from "../controllers/courceController.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
import {
  createLecture,
  editLecture,
  getlecture,
  getLectureById,
  removeLecture,
} from "../controllers/lectureController.js";

const courseRoute = express.Router();

courseRoute.post("/addcourse", authUser, createCource);
courseRoute.get("/getallcourses", authUser, getAllCources);
courseRoute.post(
  "/updatecourse/:courceId",
  authUser,
  upload.single("courseThumbnail"),
  editCourse
);
courseRoute.delete("/deletecourse/:courseId", authUser, deleteCourse);
courseRoute.get("/getcoursebyid/:courseId", getCourceById);
courseRoute.post("/createlecture/:courseId", authUser, createLecture);
courseRoute.get("/getlecture/:courseId", authUser, getlecture);
courseRoute.post("/:courseId/editlecture/:lectureId", authUser, editLecture);
courseRoute.delete("/removelecture/:lectureId", authUser, removeLecture);
courseRoute.get("/getlecturebyid/:lectureId", authUser, getLectureById);
courseRoute.put("/togglepublish/:courseId", authUser, togglePublishCourse);
courseRoute.get("/getpublishedcourse", getPublishedCourse);
courseRoute.post("/getcoursebycategory", authUser, getCourseByCategory);
courseRoute.get("/courses/search", searchCourse);

export default courseRoute;
