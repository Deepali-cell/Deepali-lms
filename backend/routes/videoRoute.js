import express from "express";
import upload from "../middleware/multer.js";
import cloudinary, { uploadMedia } from "../config/cloudinary.js";

const videoRoute = express.Router();

videoRoute.post("/uploadLecture", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res
            .status(500)
            .json({ success: false, message: "Upload failed" });
        }
        res.status(200).json({
          success: true,
          message: "File uploaded successfully",
          data: result,
        });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

export default videoRoute;
