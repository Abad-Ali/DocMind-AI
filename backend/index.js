import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routers/user.router.js";
import pdfRouter from "./routers/pdf.router.js"

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

//middlerwares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOption))

app.get('/',(_,res)=>{
    return res.status(200).json({
        message:"Backend is running...",
        success:true
    })
})

//Add api here
app.use("/api/v1/user",userRouter);
app.use("/api/v1/pdf",pdfRouter);

// starting server
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}...`);
})