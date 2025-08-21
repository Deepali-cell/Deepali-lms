import express from "express";
import mongoDb from "../config/mongoDb.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "../routes/userRoute.js";
import cookieParser from "cookie-parser";
import courceRoute from "../routes/courceRoute.js";
import videoRoute from "../routes/videoRoute.js";
import purchaseCourseRoute from "../routes/purchaseCourseRoute.js";
import ServerlessHttp from "serverless-http";

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
  res.send("welcome");
});

app.use("/api/user", userRouter);
app.use("/api/cource", courceRoute);
app.use("/api/videoupload", videoRoute);
app.use("/api/transaction", purchaseCourseRoute);

export const handler = ServerlessHttp(app);
// app.listen(3000, () => {
//   console.log("Server is working");
// });
