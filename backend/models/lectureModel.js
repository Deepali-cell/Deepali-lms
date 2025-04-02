import mongoose from "mongoose";

const lectureSchema = mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
    isPreviewFree: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const lectureModel = mongoose.model("lecture", lectureSchema);

export default lectureModel;
