import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true, lowercase: true, minlength: 3, maxlength:15, trim:true, match: [/^[a-zA-Z0-9._]+$/, 'Username can only contain letters, numbers, underscores, or dots.']},
    email:{type:String, required:true, unique:true, match: [/.+\@.+\..+/, 'Please enter a valid email address']},
    password:{type:String, required:true},
    profilePicture:{type:String, default:""}, 
    name:{type:String, default:""},
    gender:{type:String, enum:['male', 'female', 'prefer not to say'], default: 'prefer not to say'},
    role:{type:String, enum:['user', 'admin'], default: 'user'},
    isVerified:{type:Boolean, default:false},
    verificationToken:String
}, {timestamps:true});

export const User = mongoose.model('User', userSchema);