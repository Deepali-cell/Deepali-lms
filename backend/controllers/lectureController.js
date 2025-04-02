import mongoose from "mongoose";
import courceModel from "../models/courceModel.js";
import lectureModel from "../models/lectureModel.js";
import { deleteVideofromCloudinary } from "../config/cloudinary.js";

const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const courseId = req.params.courseId;

    // Validate required fields
    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    // Create new lecture
    const lectureData = { lectureTitle };
    const newLecture = new lectureModel(lectureData);
    await newLecture.save();

    // Find course and add lecture
    const findCourse = await courceModel.findById(courseId);
    if (!findCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    findCourse.lectures.push(newLecture._id);
    await findCourse.save();

    // Success response
    res.status(201).json({
      success: true,
      message: "Lecture created successfully.",
      newLecture,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};

const getlecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    const course = await courceModel.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lectures retrieved successfully.",
      lectures: course.lectures,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};
const editLecture = async (req, res) => {
  try {
    const { lectureTitle, isPreviewFree, uploadVideoInfo } = req.body;
    const { courseId, lectureId } = req.params;

    const findLecture = await lectureModel.findById(lectureId);
    if (!findLecture) {
      return res.status(404).json({
        success: false,
        message: "lecture not found.",
      });
    }
    if (lectureTitle) findLecture.lectureTitle = lectureTitle;
    if (uploadVideoInfo?.videoUrl)
      findLecture.videoUrl = uploadVideoInfo.videoUrl;
    if (uploadVideoInfo?.publicId)
      findLecture.publicId = uploadVideoInfo.publicId;
    findLecture.isPreviewFree = isPreviewFree;
    await findLecture.save();

    const findCourse = await courceModel.findById(courseId);
    if (findCourse && !findCourse.lectures.includes(findLecture._id)) {
      findCourse.lectures.push(findLecture._id);
      await findCourse.save();
    }
    res.status(200).json({
      success: true,
      message: "Lectures updated successfully.",
      findLecture,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};
const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await lectureModel.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "lecture not found.",
      });
    }

    if (lecture.publicId) {
      await deleteVideofromCloudinary(lecture.publicId);
    }

    await courceModel.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );
    res.status(200).json({
      success: true,
      message: "Lectures removed successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};
const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await lectureModel.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "lecture not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lectures get by id successfully.",
      lecture,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};


export {
  createLecture,
  getlecture,
  editLecture,
  removeLecture,
  getLectureById,
};
