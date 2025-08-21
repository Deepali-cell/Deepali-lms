import mongoose from "mongoose";

const mongoDb = async () => {
  mongoose.connection.on("connected", () => {
    console.log("mongodb is connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}`);
};

export default mongoDb;
