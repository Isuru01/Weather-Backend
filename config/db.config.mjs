import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(`Atlas Server Connection Error ${err}`);
  }
}
