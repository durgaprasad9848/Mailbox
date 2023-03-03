import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
 
 
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
            state.totalUnread=0;
            Object.keys(state.indboxdata).map((key) => { if(!state.indboxdata[key].isVisited){ state.totalUnread++;  } });

        },
        storesentbox : (state,action)=>{
            state.sentboxdata = action.payload;
        },
        updateCount : (state)=>{
            state.totalUnread=0;
            Object.keys(state.indboxdata).map((key) => { if(!state.indboxdata[key].isVisited){ state.totalUnread++;  } });
        }
    }
 })

 export const{storeindbox,storesentbox,updateCount} = Contentslice.actions;

 export default Contentslice.reducer;

export const fetchDataind = async (dispatch) => {
  
   // const dispatch = useDispatch();
    try {
      const response = await axios.get(
        `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage.getItem("email").replace("@gmail.com", "")}/receive.json`
      );
      if (response.data != null) {
        dispatch(storeindbox(response.data));
        //countfun(dispatch);
        //Object.keys(inboxdata).map((key) => { if(!inboxdata[key].isVisited){ count++;  } });
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  