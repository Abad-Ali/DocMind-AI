import axios from "axios";
import { PDFParse } from "pdf-parse";

const extractPdfText = async (pdfUrl) => {
  try {
    const res = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    const parser = new PDFParse({ data: res.data }); // pass buffer as "data"
    const result = await parser.getText(); // get full text

    await parser.destroy(); // clean up
    return result.text; // extracted text
  } catch (error) {
    console.error("PDF text extraction failed:", error);
    throw new Error("Failed to extract PDF text");
  }
};

export default extractPdfText;
