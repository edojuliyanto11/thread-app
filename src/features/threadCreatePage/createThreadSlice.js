/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const createThreadSlice = createSlice({
  name: "createThread",
  initialState: {
    title: "",
    body: "",
    category: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBody: (state, action) => {
      state.body = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setTitle, setBody, setCategory } = createThreadSlice.actions;
export default createThreadSlice.reducer;
