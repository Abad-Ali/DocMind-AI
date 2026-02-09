import { GoogleGenAI } from "@google/genai";

// Initialize the AI client with your API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Calls Gemini to generate content for a given prompt.
 * @param {string} prompt - The user/AI prompt
 * @param {string} modelName - The model to use (default = "gemini-2.5-flash-lite")
 * @returns {Promise<string>} - The plain text result from the model
 */
export const generateText = async (prompt, modelName = "gemini-2.5-flash-lite") => {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    return response.text; // the generated text string
  } catch (error) {
    console.error("AI generation error:", error);
    throw error;
  }
};
