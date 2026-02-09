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