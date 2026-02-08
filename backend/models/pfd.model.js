import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    title:{type:String, required:true, },
    description:{type:String},
    author:{type:String},
    fileUrl:{type:String, required:true},
    publicId: {type: String, required: true},
    extractedText:{type: String, required: false},
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
},{timestamps:true});

export const PDF = mongoose.model('PDF', pdfSchema);