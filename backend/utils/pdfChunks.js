// THIS WILL CREATE CHUNKS PER PAGE
// export const pdfChunks = (extractedText) => {
//   if (!extractedText) return [];

//   // Split by paragraphs (simple chunking)
//   const chunks = extractedText
//     .split("\n\n")
//     .map((text, idx) => text.trim())  // trim first
//     .filter(text => text.length > 0)  // remove empty paragraphs
//     .map((text, idx) => ({
//       text,
//       chunkNumber: idx,
//       // embedding: [] // optional for future embeddings
//     }));

//   return chunks;
// };



// THIS WILL CREATED EACH CHUNK WITH 500 WORDS
/**
 * Splits extracted PDF text into AI-friendly chunks
 * @param {string} extractedText - text extracted from PDF
 * @param {number} maxChunkLength - max characters per chunk (default 500)
 * @returns {Array} - array of chunk objects: { text, chunkNumber, embedding }
 */
export const pdfChunks = (extractedText, maxChunkLength = 500) => {
  if (!extractedText) return [];

  const chunks = [];
  const paragraphs = extractedText.split("\n\n"); // split by paragraph

  paragraphs.forEach((para) => {
    let text = para.trim();
    if (!text) return; // skip empty paragraphs

    // split long paragraphs into smaller chunks
    while (text.length > maxChunkLength) {
      chunks.push({
        text: text.slice(0, maxChunkLength),
        chunkNumber: chunks.length,
        embedding: [] // placeholder for future embeddings
      });
      text = text.slice(maxChunkLength);
    }

    if (text.length > 0) {
      chunks.push({
        text,
        chunkNumber: chunks.length,
        embedding: []
      });
    }
  });

  return chunks;
};
