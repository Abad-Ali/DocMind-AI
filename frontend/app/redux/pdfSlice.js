const { createSlice } = require("@reduxjs/toolkit");

const pdfSlice = createSlice({
    name:"pdf",
    initialState:{
        pdf:null,
    },
    reducers:{
        setPDF:(state,action)=>{
            state.pdf = action.payload;
        },
    }
});

export const { setPDF } = pdfSlice.actions;
export default pdfSlice.reducer;