const { createSlice } = require("@reduxjs/toolkit");

const pdfSlice = createSlice({
    name:"pdf",
    initialState:{
        pdf:null,
        uploadedPDFS:[],
    },
    reducers:{
        setPDF:(state,action)=>{
            state.pdf = action.payload;
        },
        setUploadedPDF:(state,action)=>{
            state.uploadedPDFS = action.payload;
        },
        removePdf: (state, action) => {
          state.uploadedPDFS = state.uploadedPDFS.filter(
            (pdf) => pdf.id !== action.payload
          );
        },
        updatePdf: (state, action) => {
          const index = state.uploadedPDFS.findIndex(pdf => pdf.id === action.payload.id);
          if (index !== -1) {
            state.uploadedPDFS[index] = {
              ...state.uploadedPDFS[index],
              ...action.payload
            };
          }
        },
        addPdf: (state, action) => {
          state.uploadedPDFS.push(action.payload);
        }
    }
});

export const { setPDF, setUploadedPDF, removePdf, updatePdf, addPdf } = pdfSlice.actions;
export default pdfSlice.reducer;