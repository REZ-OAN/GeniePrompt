// dependencies
import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected To MongoDB Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
