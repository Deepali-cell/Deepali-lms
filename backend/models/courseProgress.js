import mongoose from "mongoose";

const lectureProgressSchema = mongoose.Schema({
  lectureId: { type: String },
  viwed: { type: Boolean },
});

const courseProgressSchema = mongoose.Schema({
  user: { type: String },
  course: { type: String },
  completed: { type: Boolean },
  lectureProgress: [lectureProgressSchema],
});

const courseProgressModel = mongoose.model(
  "courseprogress",
  courseProgressSchema
);

export default courseProgressModel;
