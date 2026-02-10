import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/Email.js";
import { PDF } from "../models/pfd.model.js";

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
        const hashedPassword = await bcrypt.hash(password, 11);

        // Crteating verification Token
        const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();

        // Creating user
        await User.create({
            username,
            email,
            password: hashedPassword,
            verificationToken
        });

        await sendVerificationEmail(email,verificationToken);

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

// Verification of Email 
export const verifyEmail=async(req,res)=>{
    try {
        const {email, code}=req.body 

        // If Code is missing
        if(!code){
            return res.status(400).json({
                message: "Verification code is missing or not matched. Try again!",
                success: false
            })
        }

        // If email is missing 
        if(!email){
            return res.status(400).json({
                message: "Please enter email and try again!",
                success: false
            })
        }

        // Find user by email first
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // If email already verified
        if (user.isVerified) {
            return res.status(400).json({ message: "Email already verified", success: false });
        }

        // Check if token matches
        if (user.verificationToken !== code) {
            return res.status(400).json({ message: "Invalid or Expired Code", success: false });
        }
          
        user.isVerified=true;
        user.verificationToken=undefined;
        await user.save();
        await sendWelcomeEmail(user.email,user.username);
        return res.status(200).json({
           message:"Email Verified Successfully",
           success:true
        })
           
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
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

        // Prevent unverified users from logging in
        if(!user.isVerified){
            return res.status(403).json({
                message: "Please verify your email before logging in.",
                success: false
            });
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

// TO GET USER PROFILE 
export const getUserProfile = async(req,res)=>{
    try {
        const { userId } = req.params;

        // Finding the user by using ID
        const user = await User.findById(userId).select("username profilePicture role createdAt");

        // If user not found
        if(!user){
            return res.status(404).json({
                message:'User not found.',
                success:false
            });
        }

        // Finding pdfs which are uploaded by this user
        const pdfs = await PDF.find({uploadedBy: user._id}).sort({ createdAt: -1 }).populate("uploadedBy", "username profilePicture role");

        const pdfsWithPreview = pdfs.map(pdf => ({
            id: pdf._id.toString(),
            title: pdf.title,
            description: pdf.description,
            author: pdf.author,
            uploadedBy: pdf.uploadedBy,
            fileUrl: pdf.fileUrl,
            previewUrl: pdf.fileUrl
                ? pdf.fileUrl.replace("/upload/", "/upload/pg_1/")
                : null
        }))

        return res.status(200).json({
            success: true,
            user,
            pdfs: pdfsWithPreview
        })

    } catch (error) {
        console.error("GET USER PROFILE error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

// CHANGE PASSWORD
export const changePassword = async(req,res)=>{
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;
        
        // Finding the user by ID
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:'User not found.',
                success:false
            });
        }

        // If Unauhorise user
        if(userId !== user.id){
            return res.status(403).json({
                message: "Forbidden: you do not have permission to access this resource.",
                success: false
            })
        }

        // Checking if password is correct or not 
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Current password is incorrect.",
                success: false
            })
        }

        // If newpassword is not same as confirmpassword
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: "New password and confirm password do not match.",
                success: false
            })
        }

        // If both currentpassword and newpassword is same
        if(currentPassword === newPassword){
            return res.status(400).json({
                message:"New password must be different from current password.",
                success: false
            })
        }

        // Hashing the newPassword
        const hashedPassword = await bcrypt.hash(newPassword, 11);
        // Updating password
        user.password = hashedPassword;

        // Saving the changes in DB
        await user.save();

        // Remove password before sending response
        const { password, ...userData } = user._doc;

        return res.status(200).json({
            message:'Password changed successfully...',
            success:true,
            user: userData
        })

    } catch (error) {
        console.error("Error in changing password:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}