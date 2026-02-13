import mongoose from "mongoose";


const chunkSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    // embedding: { type: [Number], default: [] }, //  for future embeddings
    chunkNumber: { type: Number } // optional but to  preserves order
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false } // prevents extra _id for each question
);

const pdfSchema = new mongoose.Schema({
    title:{type:String, required:true, },
    description:{type:String},
    author:{type:String},
    fileUrl:{type:String, required:true},
    publicId: {type: String, required: true},
    extractedText:{type: String, required: false},
    chunks: {type: [chunkSchema], default: []},
    aiSummary: {type: String},
    aiQuestions: {
      type: [questionSchema],
      default: [],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
},{timestamps:true});

export const PDF = mongoose.model('PDF', pdfSchema);