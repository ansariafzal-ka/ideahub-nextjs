import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  if (isConnected) {
    console.log("Already connected to Mongodb");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "idea-hub",
    });
    console.log("Connected to mongodb");
    isConnected = true;
  } catch (error) {
    console.log("Error in connecting to mongodb");
  }
};
