const { createSlice } = require("@reduxjs/toolkit");

const recentPDFSlice = createSlice({
    name:"recPDF",
    initialState:{
        recentPDF: [],
    },
    reducers:{
        setRecentPDF:(state,action)=>{
            state.recentPDF = action.payload;
        },
    }
});

export const { setRecentPDF } = recentPDFSlice.actions;
export default recentPDFSlice.reducer;