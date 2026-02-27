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
    }
});

export const { setPDF, setUploadedPDF } = pdfSlice.actions;
export default pdfSlice.reducer;