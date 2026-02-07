import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected sucessfully...");
    } catch (error) {
        console.log("Database connection error:", error);
    }
}
export default connectDB;