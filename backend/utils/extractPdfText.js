// import axios from "axios";
// import { PDFParse } from "pdf-parse";

// const extractPdfText = async (pdfUrl) => {
//   try {
//     const res = await axios.get(pdfUrl, { responseType: "arraybuffer" });

//     const parser = new PDFParse({ data: res.data }); // pass buffer as "data"
//     const result = await parser.getText(); // get full text

//     await parser.destroy(); // clean up
//     return result.text; // extracted text
//   } catch (error) {
//     console.error("PDF text extraction failed:", error);
//     throw new Error("Failed to extract PDF text");
//   }
// };

// export default extractPdfText;




import axios from "axios";
import https from "https";
import { PDFParse } from "pdf-parse";

const httpsAgent = new https.Agent({
  family: 4, // 👈 force IPv4
});

const extractPdfText = async (pdfUrl) => {
  try {
    const res = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
      httpsAgent: httpsAgent,
      timeout: 15000,
    });

    const parser = new PDFParse({ data: res.data });
    const result = await parser.getText();

    await parser.destroy();
    return result.text;
  } catch (error) {
    console.error("PDF text extraction failed:", error);
    throw new Error("Failed to extract PDF text");
  }
};

export default extractPdfText;
