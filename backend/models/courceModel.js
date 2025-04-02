import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    courseLevel: {
      type: String,
      enum: ["beginner", "medium", "advance"],
    },
    coursePrice: {
      type: Number,
      default: null,
    },
    courseThumbnail: {
      type: String,
      default: "", // Add a default thumbnail
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    published: {
      type: Boolean,
      default: false,
    },
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "lecture" }],
  },
  { timestamps: true }
);

const courceModel = mongoose.model("course", courseSchema);

export default courceModel;
