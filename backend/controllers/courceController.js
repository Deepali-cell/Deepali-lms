import cloudinary from "../config/cloudinary.js";
import courceModel from "../models/courceModel.js";
import { PassThrough } from "stream";

const createCource = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const courceData = { courseTitle, category, createdBy: req.userId };
    const newCource = new courceModel(courceData);
    await newCource.save();
    res.status(201).json({
      success: true,
      message: "cource created successfully",
      courceData,
    });
  } catch (error) {
    console.log("error: ", error);
    res.json({ success: false, message: error });
  }
};

const getAllCources = async (req, res) => {
  try {
    const getallcource = await courceModel.find({ createdBy: req.userId });
    if (!getallcource) {
      return res
        .status(400)
        .json({ success: false, message: "cources not found" });
    }
    res.status(201).json({
      success: true,
      message: "all cources get successfully",
      getallcource,
    });
  } catch (error) {
    console.log("error: ", error);
    res.json({ success: false, message: error });
  }
};

const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courceId;
    const userId = req.userId;
    let courseThumbnail = req.file;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;

    // Optional: If an image is required for every update, validate here.
    if (!courseThumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "No image file uploaded." });
    }

    const bufferStream = new PassThrough();
    bufferStream.end(courseThumbnail.buffer);

    const cloudinaryUpload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "courseThumbnail" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      bufferStream.pipe(stream);
    });
    // Prepare update data dynamically based on fields provided in the request.
    const updateData = {};
    if (courseTitle?.trim()) updateData.courseTitle = courseTitle;
    if (subTitle?.trim()) updateData.subTitle = subTitle;
    if (description?.trim()) updateData.description = description;
    if (category?.trim()) updateData.category = category;
    if (courseLevel?.trim()) updateData.courseLevel = courseLevel;
    if (coursePrice) updateData.coursePrice = coursePrice; // Allow `0` as a valid price

    // Add the new course thumbnail URL to the update data.
    updateData.courseThumbnail = cloudinaryUpload.secure_url;

    // Update the course with the prepared data.
    const updatedCourse = await courceModel.findByIdAndUpdate(
      courseId,
      updateData,
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found or update failed" });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.userId;

    const findCourse = await courceModel.findById(courseId);

    if (!findCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    if (findCourse.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this course.",
      });
    }
    await findCourse.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the course.",
    });
  }
};
const getCourceById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const getCourse = await courceModel
      .findById(courseId)
      .populate({ path: "createdBy", select: "name" })
      .populate({ path: "lectures", select: "lectureTitle videoUrl" });

    if (!getCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course find successfully.",
      getCourse,
    });
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while geting the course by id.",
    });
  }
};
const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; // true or false
    const course = await courceModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }
    course.published = publish === "true";
    await course.save();
    const statusMessage = course.published ? "published" : "unpublished";
    res.status(200).json({
      success: true,
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while geting the course by id.",
    });
  }
};
const getPublishedCourse = async (req, res) => {
  try {
    const publishedCourse = await courceModel
      .find({ published: true })
      .populate({ path: "createdBy", select: "name userPic" });
    if (!publishedCourse) {
      return res.status(404).json({
        success: false,
        message: "publishedCourse not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: `published course find successfully`,
      publishedCourse,
    });
  } catch (error) {
    console.error("Error publish course:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred .",
    });
  }
};
const getCourseByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    // Use regex for case-insensitive matching
    const result = await courceModel.find({
      category: { $regex: new RegExp(category, "i") },
    });

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Courses not found.",
      });
    }

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};
const searchCourse = async (req, res) => {
  const { name } = req.query;

  try {
    const courses = await courceModel.find({
      courseTitle: { $regex: name, $options: "i" }, // Case-insensitive search
    });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export {
  createCource,
  getAllCources,
  editCourse,
  deleteCourse,
  getCourceById,
  togglePublishCourse,
  getPublishedCourse,
  getCourseByCategory,
  searchCourse,
};
