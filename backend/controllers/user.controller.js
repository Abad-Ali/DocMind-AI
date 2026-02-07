import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER
export const register = async(req, res)=>{
    try {
        const {username, email, password} = req.body;

        // Basic required fields check
        if(!username || !email || !password){
            return res.status(400).json({
                message: "Something is missing, please check!",
                success: false
            })
        }

        // Check if email already exists
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(409).json({
                message: "Email already in use. Try a different one.",
                success: false
            })
        }

        // Check if username already exists
        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.status(409).json({
                message: "Username already exists. Try a different one.",
                success: false
            })
        }

        // password should be greater than 7 digits
        if(password.length<=7){
            return res.status(400).json({
              message: "Password must be at least 8 characters long"
            });
        }
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 17);

        // Creating user
        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Account created successfully...",
            success:true
        })

    } catch (error) {
        console.error("Registration error:", error);

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
           const messages = Object.values(error.errors).map(val => val.message);
           return res.status(400).json({
              message: messages.join(", "),
              success: false,
            });
        }
      
        return res.status(500).json({
          message: "Internal Server Error",
          success: false,
        });
    }
}

// LOGIN
export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        
        // Basic required fields check
        if(!email || !password){
            return res.status(400).json({
                message: "Something is missing, please check!",
                success: false
            })
        }

        // Finding user
        let user = await User.findOne({email});

        // If incorrect email
        if(!user){
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }
 
        // Checking if password is correct or not 
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                message: "Incorrect password. Try again later",
                success: false
            })
        }

        // Making token
        const token = await jwt.sign({userId:user._id, role: user.role}, process.env.SECRET_KEY, {expiresIn: '7d'});

        // Prepare user data for frontend
        const userData = {
            _id:user._id,
            username:user.username,
            email:user.email,
            profilePicture:user.profilePicture,
            name:user.name,
            gender:user.gender,
            role:user.role
        }

        return res.cookie('token', token, {httpOnly:true, secure: true, sameSite:"none", maxAge: 7*24*60*60*1000}).json({
            message:`Welcome back ${userData.username}`,
            success:true,
            user: userData
        })
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

// LOGOUT
export const logout = async(req,res)=>{
    try {
        return res.cookie ("token", "", {maxAge:0}).status(200).json({
        message:"Logged out successfully.",
        success:true
       });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

// EDIT USER PROFILE
export const editProfile = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {username, name, gender} = req.body;
        const profilePicture = req.file;

        let cloudResponse;
        if(profilePicture){
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri,{
                folder: `DocMindAI/Profile_Picture/${userId}`
            });
        }

        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({
                message:'User not found.',
                success:false
            });
        }

        // Check if username already exists
        if(username){
            const existingUsername = await User.findOne({username, _id:{ $ne: userId}});
            if(existingUsername){
               return res.status(409).json({
                   message: "Username already exists. Try a different one.",
                   success: false
               })
             }
        }
    
        // Updating profile details
        if(username) user.username = username;
        if(name) user.name = name;
        if(gender) user.gender = gender;
        if(profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();
        return res.status(200).json({
            message:'Profile updated successfully',
            success:true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while updating the profile.',
            success: false,
            error: error.message
        });
    }
}