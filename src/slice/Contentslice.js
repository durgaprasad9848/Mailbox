import { createSlice } from "@reduxjs/toolkit";

 const Contentslice = createSlice({
    name : "content",
    initialState: {
        indboxdata : [],
        sentboxdata : [],
        totalUnread : 0,
    },
    reducers:{
        storeindbox : (state,action)=>{
            state.indboxdata = action.payload;
            console.log("inside red",state.indboxdata);

        },
        storesentbox : (state,action)=>{
            state.sentboxdata = action.payload;
        },
        updateCount : (state,action)=>{
            state.totalUnread = action.payload;
        }
    }
 })

 export const{storeindbox,storesentbox,updateCount} = Contentslice.actions;

 export default Contentslice.reducer;