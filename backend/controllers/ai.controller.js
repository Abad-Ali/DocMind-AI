import { PDF } from "../models/pfd.model.js";
import { generateText } from "../services/ai.service.js";

// Helper for fake AI delay (for UX)
const fakeDelay = (ms = 1500) =>
  new Promise(res =>
      setTimeout(res, ms)
  );

// TO GENERATE SUMMARY
export const generateSummary = async(req,res)=>{
    try {
        const {pdfId} = req.params;

        // If pdfId is missing
        if(!pdfId){
            return res.status(400).json({
                message: "PDF ID is missing...",
                success: false
            })
        }

        // Finding the pdf by using id 
        const pdf = await PDF.findById(pdfId);

        // IF pdf not found
        if(!pdf){
            return res.status(404).json({
                message: "PDF not found...",
                success: false
            })
        }

        // IF PDF IS TOO LONG 
        const MAX_CHARACTERS = 3000; // depends on API token limit
        if (pdf.extractedText.length > MAX_CHARACTERS) {
          return res.status(400).json({
            message: "PDF is too long to generate summary with the free AI API",
            success: false
          });
        }


        // this avoids unnecessary AI calls and reduces cost + latency
        if(pdf.aiSummary){
            await fakeDelay(1500);
            return res.status(200).json({
                aiSummary: pdf.aiSummary,
                cached: true,
                success: true
            })
        }

        //AI  prompt
        const prompt = `
           Write a concise bullet-point summary of the document.
           
           Rules:
           - Return ONLY plain text
           - Do NOT add any introduction
           - Say "Here is a summary of the PDF: "
           - Do NOT use markdown
           - Use simple hyphen (-) bullets only
           
           Document:
           ${pdf.extractedText}
        `;

        // This will call the api of model as per prompt
        const aiSummary  = await generateText(prompt);

        // // only for testing
        // const result = "abcd ai generated  result ";
        // const aiSummary = result;

        // Saving Ai generated summary to DB
        pdf.aiSummary = aiSummary;
        await pdf.save();

        return res.status(200).json({
            aiSummary,
            cached: false,
            success: true
        })
        
    } catch (error) {
        console.error("Summary Error:", error);
        return res.status(500).json({
          message: "Failed to generate summary from pdf",
          success: false
        });
    }
}

// TO GENERATE QUESTIONS
export const generateQuestions = async(req,res)=>{
    try {
        const {pdfId} = req.params;

        // If pdfId is missing
        if(!pdfId){
            return res.status(400).json({
                message: "PDF ID is missing...",
                success: false
            })
        }

        // Finding the pdf by using id 
        const pdf = await PDF.findById(pdfId);

        // IF pdf not found
        if(!pdf){
            return res.status(404).json({
                message: "PDF not found...",
                success: false
            })
        }

        const MAX_CHARACTERS = 3000; // depends on API token limit
        if (pdf.extractedText.length > MAX_CHARACTERS) {
          return res.status(400).json({
            message: "PDF is too long to generate questions with the free AI API",
            success: false
          });
        }

        // this avoids unnecessary AI calls and reduces cost + latency
        if(pdf.aiQuestions && pdf.aiQuestions.length > 0){
            await fakeDelay(1500);
            return res.status(200).json({
                aiQuestions: pdf.aiQuestions,
                cached: true,
                success: true
            })
        }

        //AI  prompt
        const  prompt = `
            You are an API.

            Return ONLY valid JSON.
            No explanation.
            No markdown.
            No extra text.
            
            Generate exactly 5 study questions and answers from the content below.
            
            Format:
            [
              { "question": "string", "answer": "string" }
            ]
            Content: ${pdf.extractedText}
        `;

        // const aiQuestions = await generateText(prompt);

        // This will call the api of model as per prompt
        const aiResponse = await generateText(prompt);

        let aiQuestions;
        try {
          aiQuestions = JSON.parse(aiResponse);
        } catch (err) {
          console.error("AI returned invalid JSON:", aiResponse);
          return res.status(500).json({
            message: "AI response could not be parsed",
            success: false
          });
        }

        // // only for testing
        // const result = [
        //   { question: "Question 1?", answer: "Answer 1" },
        //   { question: "Question 2?", answer: "Answer 2" },
        //   { question: "Question 3?", answer: "Answer 3" },
        //   { question: "Question 4?", answer: "Answer 4" },
        //   { question: "Question 5?", answer: "Answer 5" },
        // ];
        // const aiQuestions = result;

        // Saving Ai generated Questions and answers to DB
        pdf.aiQuestions = aiQuestions;
        await pdf.save();

        return res.status(200).json({
            aiQuestions,
            cached: false,
            success: true
        })
        
    } catch (error) {
        console.error("Questions Error:", error);
        return res.status(500).json({
          message: "Failed to generate questions & answers from pdf",
          success: false
        });
    }
}

// TO ENHANCE THE TITLE
export const enhanceTitle = async(req,res)=>{
    try {
        const { title } = req.body;

        // Validate title
        if(!title || title.trim() === ""){
            return res.status(400).json({
                message: "Please enter the title first",
                success: false
            })
        }

        // If title too long
        if (title.length > 200) {
          return res.status(400).json({
            message: "Title is too long",
            success: false
          });
        }

        //AI  prompt
        const prompt = `
           You are a professional title editor.
           
           Your task is to improve the clarity and professionalism of the given title.
           
           Return ONLY the improved title text.
           Do not include explanations.
           
           Title:
           """${title}"""
        `;

        // Call AI model
        const aiEnhanceTitle  = await generateText(prompt);


        return res.status(200).json({
            message:"Title enhanced by AI successfully",
            success: true,
            aiEnhanceTitle
        })
        
    } catch (error) {
        console.error("Title Enhance error:", error);
        return res.status(500).json({
          message: "Failed to enhance the title of the PDF",
          success: false
        });
    }
}

// TO ENHANCE THE DESCRIPTION
export const enhanceDescription= async(req,res)=>{
    try {
        const { description } = req.body;

        // Validate description
        if(!description || description.trim() === ""){
            return res.status(400).json({
                message: "Please enter the description first",
                success: false
            })
        }

        // If description too long
        if (description.length > 500) {
          return res.status(400).json({
            message: "Description is too long",
            success: false
          });
        }

        //AI  prompt
        const prompt = `
           You are a professional copywriter.
           
           Rewrite the following description to make it clear, professional, and well-structured.
           
           Rules:
           - Preserve the original meaning
           - Improve clarity and flow
           - Make it concise but impactful
           - Use professional tone
           - Return ONLY plain text
           - Do NOT add headings or markdown
           - Do NOT add explanations
           
           Description:
           """${description}"""
        `;

        // Call AI model
        const aiEnhanceDescription  = await generateText(prompt);


        return res.status(200).json({
            message:"Description enhanced by AI successfully",
            success: true,
            aiEnhanceDescription
        })
        
    } catch (error) {
        console.error("Description Enhance error:", error);
        return res.status(500).json({
          message: "Failed to enhance the description of the PDF",
          success: false
        });
    }
}

// Chat with PDF 
export const chatWithAIPDF = async(req,res)=>{
    try {
        const {pdfId} = req.params;
        const {question} = req.body;

        if(!question || question.trim() === ""){
            return res.status(400).json({
                message:"Please enter your question",
                success:false
            })
        }

        if(question.length> 100) {
          return res.status(400).json({
            message: "Question must be under 100 characters.",
            success: false
          });
        }

        // Finding the pdf by using id 
        const pdf = await PDF.findById(pdfId);

        // IF pdf not found
        if(!pdf){
            return res.status(404).json({
                message: "PDF not found...",
                success: false
            })
        }

        // pdf: your PDF document with chunks
        // question: student's question
        const getRelevantChunks = (pdf, question, top = 3) => {
          const lowerQ = question.toLowerCase();
          
          // Filter chunks that contain any keyword from question
          const filtered = pdf.chunks.filter(chunk => 
            chunk.text.toLowerCase().includes(lowerQ)
          );
        
          // If none match, fallback to first 3 chunks
          if (filtered.length === 0) return pdf.chunks.slice(0, top);
        
          return filtered.slice(0, top);
        };

        const chunks = getRelevantChunks(pdf, question);

        const prompt = `
           You are an AI tutor named DocMind AI.
           Use the provided PDF chunks to answer the student's question.
           Explain clearly in your own words.
           Do NOT add information not in the context.
           
           PDF Chunks:
           ${chunks.map(c => c.text).join("\n\n")}
           
           Student Question: ${question}
        `;
        // console.log(chunks);

        // This will call the api of model as per prompt
        const aiResponse = await generateText(prompt);

        return res.status(200).json({
            message:"AI generated answer successfully",
            success: true,
            aiResponse
        })
    } catch (error) {
        console.error("Error in chat with PDF:", error);

        if (error.response?.status === 429) {
           return res.status(429).json({
              success: false,
              message: "Rate limit exceeded. Please wait and try again."
           });
        }

        if (error.response?.status === 403) {
           return res.status(403).json({
              success: false,
              message: "Free API quota exceeded. Try again later."
           });
        }

        return res.status(500).json({
          message: "Failed to chat with PDF",
          success: false
        });
    }
}