import courceModel from "../models/courceModel.js";
import purchaseCourseModel from "../models/PurchaseCourseModel.js";
import userModel from "../models/userModel.js";

// Create a Checkout Session
const createCheckOutSession = async (req, res) => {
  try {
    const user = req.userId;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    const course = await courceModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const newPurchaseCourse = await purchaseCourseModel.create({
      course: course._id,
      user,
      amount: course.coursePrice,
      status: "pending",
      paymentId: `PAY-${Date.now()}`, // Generate unique payment ID
    });

    return res.status(201).json({
      success: true,
      message: "Checkout session created successfully.",
      paymentId: newPurchaseCourse.paymentId,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating checkout session.",
    });
  }
};

const completeTransaction = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required.",
      });
    }

    const purchase = await purchaseCourseModel
      .findOne({ paymentId: sessionId })
      .populate("course");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found.",
      });
    }

    if (purchase.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Transaction is already completed.",
      });
    }

    purchase.status = "completed";
    await purchase.save();

    // Update user's enrolledCourses
    await userModel.findByIdAndUpdate(
      purchase.user,
      { $addToSet: { enrollementCourses: purchase.course._id } },
      { new: true }
    );

    // Update course's enrolledStudents
    await courceModel.findByIdAndUpdate(
      purchase.course._id,
      { $addToSet: { enrolledStudents: purchase.user } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Transaction completed successfully.",
    });
  } catch (error) {
    console.error("Error completing transaction:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while completing the transaction.",
    });
  }
};
const getPurchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = req.userId;
    const course = await courceModel
      .findById(courseId)
      .populate({ path: "createdBy" })
      .populate({ path: "lectures" });
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course is not found.",
      });
    }
    const purchased = await purchaseCourseModel.findOne({
      user,
      course: courseId,
    });
    return res.status(200).json({
      success: true,
      course,
      purchased: purchased ? true : false,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred .",
    });
  }
};
const getAllPurchaseCourse = async (req, res) => {
  try {
    // Fetch all completed purchase courses with populated course details
    const purchaseCourses = await purchaseCourseModel
      .find({ status: "completed" })
      .populate("course");

    // If no purchase courses are found, return an empty array with success
    if (!purchaseCourses || purchaseCourses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No completed purchase courses found.",
        purchaseCourses: [],
      });
    }

    // Return the fetched purchase courses
    return res.status(200).json({
      success: true,
      message: "Completed purchase courses fetched successfully.",
      purchaseCourses,
    });
  } catch (error) {
    console.error("Error fetching purchase courses:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching purchase courses.",
    });
  }
};
const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseLecture = await courceModel
      .findById(courseId)
      .populate({ path: "lectures" });
    if (!courseLecture) {
      return res.status(404).json({
        success: false,
        message: "courselecture not found.",
      });
    }
    return res.status(200).json({ success: true, courseLecture });
  } catch (error) {
    console.error("Error fetching purchase courses:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred .",
    });
  }
};
export {
  createCheckOutSession,
  completeTransaction,
  getPurchaseCourse,
  getAllPurchaseCourse,
  getCourseLecture,
};
