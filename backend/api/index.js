import express from "express";
import mongoDb from "../config/mongoDb.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "../routes/userRoute.js";
import cookieParser from "cookie-parser";
import courceRoute from "../routes/courceRoute.js";
import videoRoute from "../routes/videoRoute.js";
import purchaseCourseRoute from "../routes/purchaseCourseRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

mongoDb();

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

app.use("/user", userRouter);
app.use("/cource", courceRoute);
app.use("/videoupload", videoRoute);
app.use("/transaction", purchaseCourseRoute);

// ✅ Default export required by Vercel
export default app;
