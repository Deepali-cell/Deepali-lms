import mongoose from "mongoose";

const purchaseCourseSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const purchaseCourseModel = mongoose.model(
  "purchasecourse",
  purchaseCourseSchema
);

export default purchaseCourseModel;
