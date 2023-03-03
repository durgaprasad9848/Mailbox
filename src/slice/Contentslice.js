import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";
import useHttp from "../custom_hooks/useHttp";

const Contentslice = createSlice({
  name: "content",
  initialState: {
    indboxdata: [],
    sentboxdata: [],
    totalUnread: 0,
  },
  reducers: {
    storeindbox: (state, action) => {
      state.indboxdata = action.payload;
      console.log("inside red", state.indboxdata);
      state.totalUnread = 0;
      Object.keys(state.indboxdata).map((key) => {
        if (!state.indboxdata[key].isVisited) {
          state.totalUnread++;
        }
      });
    },
    storesentbox: (state, action) => {
      state.sentboxdata = action.payload;
    },
    updateCount: (state) => {
      state.totalUnread = 0;
      Object.keys(state.indboxdata).map((key) => {
        if (!state.indboxdata[key].isVisited) {
          state.totalUnread++;
        }
      });
    },
    emptyIndbox: (state) => {
      state.totalUnread = 0;
      state.indboxdata = [];
    },
    emptySentbox: (state) => {
      state.sentboxdata = [];
    },
  },
});

export const {
  storeindbox,
  storesentbox,
  updateCount,
  emptyIndbox,
  emptySentbox,
} = Contentslice.actions;

export default Contentslice.reducer;

export const fetchDataind = async (dispatch) => {
  try {
    const response = await axios.get(
      `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage
        .getItem("email")
        .replace("@gmail.com", "")}/receive.json`
    );
    if (response.data != null) {
      dispatch(storeindbox(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDatasent = async (dispatch) => {
  try {
    const response = await axios.get(
      `https://test-api-c7d27-default-rtdb.firebaseio.com/${localStorage
        .getItem("email")
        .replace("@gmail.com", "")}/send.json`
    );
    if (response.data != null) {
      dispatch(storesentbox(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
