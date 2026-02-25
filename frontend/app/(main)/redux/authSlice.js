const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user: null,
        // isAuthenticated: false,
        userProfile:null,
        bookmarks:[]
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user = action.payload;
        },
        setUserProfile:(state,action)=>{
            state.userProfile = action.payload;
        },
        setBookmarks:(state,action)=>{
            state.bookmarks = action.payload;
        }
    }
});

export const { setAuthUser, setUserProfile, setBookmarks } = authSlice.actions;
export default authSlice.reducer;