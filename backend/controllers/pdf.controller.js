import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { PDF } from "../models/pfd.model.js";
import mongoose from 'mongoose';
import extractPdfText from "../utils/extractPdfText.js";
import { User } from "../models/user.model.js";
import { sendAISummaryandQAEmail } from "../utils/Email.js";
import { pdfChunks } from "../utils/pdfChunks.js";

//UPLOAD PDF'S
export const uploadPDF = async(req,res)=>{
    try {
        const pdfFile = req.file;
        const {title, description, author} = req.body;

        if(!pdfFile){
            return res.status(400).json({
                message: "Please select a pdf file",
                success: false
            })
        }

        if(!title || !description || !author){
            return res.status(400).json({
                message: "Something is missing please check...",
                success: false
            })
        }

        // Convert to dataUri 
        const fileUri = getDataUri(pdfFile);

        // upload to cloudinary
        const cloudResponse = await cloudinary.uploader.upload(fileUri,{
            folder: `DocMindAI/PDFs/${req.user.id}`,
            resource_type: "auto",  //important for pdf
            use_filename: true,
            unique_filename: false
        });

        // Extract text from uploaded PDF
        const extractedText = await extractPdfText(cloudResponse.secure_url);

        const pdf = await PDF.create({
            title,
            description,
            author,
            fileUrl: cloudResponse.secure_url,
            publicId: cloudResponse.public_id,
            extractedText,
            chunks: pdfChunks(extractedText),
            uploadedBy: req.user.id
        });
        
        return res.status(201).json({
            message: "PDF uploaded successfully...",
            success: true,
            pdf: {
                _id: pdf._id,
                title: pdf.title,
                description: pdf.description,
                author: pdf.author,
                fileUrl: pdf.fileUrl,
                uploadedBy: pdf.uploadedBy,
                uploadedAt: pdf.createdAt
            },
            extractedText: extractedText
        })
    } catch (error) {
        console.error("PDF upload error:", error);
        return res.status(500).json({
            message: "Something went wrong while uploading PDF",
            success: false,
            error: error.message
        });
    }
}

//EDIT PDF DETAILS
export const editPDF = async(req,res)=>{
    try {
        const { pdfId } = req.params;
        const {title, description, author} = req.body;
        const userId = req.user.id;
        
        //checking inputs
        if(!title || !description || !author){
            return res.status(400).json({
                message: "Something is missing please check...",
                success: false
            })
        }

        //Finding the PDF by ID
        const pdf = await PDF.findById(pdfId);
        if (!pdf) {
          return res.status(404).json({
            message: "PDF not found",
            success: false,
          });
        }

        //checking ownership
        if(userId !== pdf.uploadedBy.toString()){
            return res.status(403).json({
                message: "Only Owner allowed",
                success: false
            })
        }

        //Updating the fields
        pdf.title = title;
        pdf.description = description;
        pdf.author = author;

        await pdf.save();
        return res.status(200).json({
            message: "PDF details updated successfully...",
            success: true,
            pdf: {
              _id: pdf._id,
              title: pdf.title,
              description: pdf.description,
              author: pdf.author,
              fileUrl: pdf.fileUrl,
              uploadedBy: pdf.uploadedBy,
              uploadedAt: pdf.createdAt,
            },
        })
    } catch (error) {
        console.error("Edit PDF error:", error);
        return res.status(500).json({
          message: "Something went wrong while editing PDF",
          success: false,
          error: error.message,
        });
    }
}

// DELETE PDF
export const deletePDF = async(req,res)=>{
    try {
        const { pdfId } = req.params;
        const userId = req.user.id;
        
        if (!mongoose.Types.ObjectId.isValid(pdfId)) {
          return res.status(400).json({
            message: "Invalid PDF ID",
            success: false
          });
        }
        
        //Finding the PDF by ID
        const pdf = await PDF.findById(pdfId);
        if (!pdf) {
          return res.status(404).json({
            message: "PDF not found",
            success: false,
          });
        }

        //checking ownership
        if(userId !== pdf.uploadedBy.toString()){
            return res.status(403).json({
                message: "Only Owner allowed",
                success: false
            })
        }

        //delete PDF from Cloudinary 
        await cloudinary.uploader.destroy(pdf.publicId, {
          resource_type: "image",
          use_filename: true,
          unique_filename: false
        });

        //delete PDF from mongobd
        await PDF.findByIdAndDelete(pdfId);

        return res.status(200).json({
            message:'PDF deleted successfully...',
            success:true
        });
    } catch (error) {
        console.error('Error in deletePDF:', error);
        return res.status(500).json({
          message: 'Failed to delete PDF',
          success: false
        })
    }
}

//GET LATEST PDF's
export const getLatestPDFs = async(req,res)=>{
    try {
        const pdfs = await PDF.find().populate("uploadedBy", "name email").sort({ createdAt: -1 }).limit(10);

        const pdfsWithPreview = pdfs.map(pdf => ({
            id: pdf._id,
            title: pdf.title,
            description: pdf.description,
            author: pdf.author,
            uploadedBy: pdf.uploadedBy,
            fileUrl: pdf.fileUrl,
            previewUrl: pdf.fileUrl.replace("/upload/", "/upload/pg_1/") // first page preview
        }))

        return res.status(200).json({
          success: true,
          pdfs: pdfsWithPreview
        })
    } catch (error) {
        console.error("Error fetching latest PDFs:", error);
        return res.status(500).json({
          message: "Failed to fetch latest PDFs",
          success: false
        });
    }
}

//Admin uploaded pdf's
export const getUploadedPDFs =async(req,res)=>{
    try {
        const userId = req.user.id;

        // finding the pdfs which have same uploadedby as userId
        const uploadedPDFs = await PDF.find({ uploadedBy: userId }).sort({ createdAt: -1 }).populate("uploadedBy", "name email").lean();

        // If admin didn't upload a single pdf
        if (uploadedPDFs.length === 0) {
            return res.status(200).json({
                message: "You have not uploaded any PDFs yet",
                success: true,
                pdfs: []
            });
        }

        const pdfsWithPreview = uploadedPDFs.map(pdf => ({
            id: pdf._id.toString(),
            title: pdf.title,
            description: pdf.description,
            author: pdf.author,
            uploadedBy: pdf.uploadedBy,
            fileUrl: pdf.fileUrl,
            previewUrl: pdf.fileUrl.replace("/upload/", "/upload/pg_1/") // first page preview
        }))

        return res.status(200).json({
            success: true,
            pdfs: pdfsWithPreview
        })
    } catch (error) {
        console.error("Error fetching uploaded PDFs:", error);
        return res.status(500).json({
          message: "Failed to fetch uploaded PDFs",
          success: false
        });
    }
}

// Search PDF
export const searchPDF = async(req,res)=>{
    try {
        const { title } = req.body;

        const searchedPDF = await PDF.find({ title: { $regex: title, $options: "i" } }).sort({ createdAt: -1 }).populate("uploadedBy", "name email").lean();

        const pdfsWithPreview = searchedPDF.map(pdf => ({
            id: pdf._id.toString(),
            title: pdf.title,
            description: pdf.description,
            author: pdf.author,
            uploadedBy: pdf.uploadedBy,
            fileUrl: pdf.fileUrl,
            previewUrl: pdf.fileUrl.replace("/upload/", "/upload/pg_1/")
        }))

        if (pdfsWithPreview.length === 0) {
            return res.status(404).json({
                message: "No PDFs found matching your search",
                success: false,
                pdfs: []
            });
        }

        return res.status(200).json({
            success: true,
            pdfs: pdfsWithPreview
        })
    } catch (error) {
        console.error("Error in searching PDF:", error);
        return res.status(500).json({
          message: "Failed to search PDF",
          success: false
        });
    }
}

// DOWNLOAD PDF
export const downloadPDF = async(req,res)=>{
    try {
        const { pdfId } = req.params;
        // console.log(pdfId);

        // finding pdf
        const pdf = await PDF.findById(pdfId);
        // console.log(pdf)

        // if pdf not found
        if (!pdf) {
            return res.status(404).json({
                message: "PDF not found",
                success: false
            });
        }

        // Redirect to Cloudinary URL with download header
        res.setHeader('Content-Disposition', `attachment; filename="${pdf.title}.pdf"`);
        res.redirect(pdf.fileUrl); // redirects the client to Cloudinary for download
    } catch (error) {
        console.error("Error downloading PDF:", error);
        return res.status(500).json({
            message: "Failed to download PDF",
            success: false
        });
    }
}


// it is not a a route — it’s just a function ---> NOT USING
export const testPdfExtraction = async (req, res) => {
  try {
    const { pdfId } = req.params;

    const pdf = await PDF.findById(pdfId);
    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    const text = await extractPdfText(pdf.fileUrl);

    return res.status(200).json({
      success: true,
      textPreview: text.slice(0, 1000), // only preview
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TO GET PDF 
export const getPDF = async(req,res)=>{
    try {
        const { pdfId } = req.params

        // Finding the pdf by ID
        const pdf = await PDF.findById(pdfId).select('-publicId');

        // Tf pdf not found
        if (!pdf) {
          return res.status(404).json({
            success: false,
            message: "PDF not found",
          });
        }

        return res.status(200).json({
            success: true,
            pdf
        })
    } catch (error) {
        console.error("Error fetching PDF:", error);
        return res.status(500).json({
          message: "Failed to fetch PDF",
          success: false
        });
    }
}

// To SEND AISUMMARY AND QUESTIONS AND ANSWERS ON EMAIL
export const sendEmail = async(req,res)=>{
    try {
        const userId = req.user.id;
        const { pdfId } = req.params;

        const user = await User.findById(userId).select('-password');
        const pdf = await PDF.findById(pdfId).select('-publicId');

        // Tf pdf not found
        if (!pdf) {
          return res.status(404).json({
            success: false,
            message: "PDF not found",
          })
        }

        if (!pdf.aiSummary || !pdf.aiQuestions || pdf.aiQuestions.length === 0) {
          return res.status(400).json({
            message: "Please first generate AI summary and AI Questions",
            success: false
          })
        }

        await sendAISummaryandQAEmail(user.email, user.username, pdf.title, pdf.aiSummary, pdf.aiQuestions)
        return res.status(200).json({
            message:"AI Summary & Questions emailed successfully!",
            success: true
        })
    } catch (error) {
        console.error("Error in sending summary and questions and answers to user email:", error);
        return res.status(500).json({
          message: "Failed to send summary and questions and answers to user email.",
          success: false
        });
    }
}

// BOOKMARK PDF
export const bookmarkPDF = async(req,res)=>{
    try {
        const { pdfId } = req.params;
        const userId = req.user.id;

        const pdf = await PDF.findById(pdfId);
        if(!pdf){
            return res.status(404).json({
                message:'PDF not found.',
                success:false
            });
        }

        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({
            message: 'User not found.',
            success: false
          });
        }

        if(user.bookmarks.includes(pdf._id)){
            // already bookmarked ---->  remove it 
            await user.updateOne({$pull:{bookmarks:pdf._id}});
            await user.save();
            return res.status(200).json({
                message:'PDF removed from bookmarks',
                success:true
            });
        }else{
            // bookmarked the pdf
            await user.updateOne({$addToSet:{bookmarks:pdf._id}});
            await user.save();
            return res.status(200).json({
                message:'PDF bookmarked successfully',
                success:true
            });
        }
    } catch (error) {
        console.error('Error in bookmark PDF:', error);
        return res.status(500).json({
          message: 'Failed to toggle bookmark',
          success: false
        });
    }
} 