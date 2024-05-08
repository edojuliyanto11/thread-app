/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchThreadsAndUsers as apiFetchThreadsAndUsers } from "../../api/api";

export const fetchThreadsAndUsers = createAsyncThunk(
  "threads/fetchThreadsAndUsers",
  async () => await apiFetchThreadsAndUsers()
);

const threadsSlice = createSlice({
  name: "threads",
  initialState: {
    threads: [],
    users: [],
    isLoading: false,
    loadingProgress: 0,
    error: null,
  },
  reducers: {
    setLoadingProgress: (state, action) => {
      state.loadingProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadsAndUsers.pending, (state) => {
        state.isLoading = true;
        state.loadingProgress = 0;
      })
      .addCase(fetchThreadsAndUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload.threads;
        state.users = action.payload.users;
      })
      .addCase(fetchThreadsAndUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoadingProgress } = threadsSlice.actions;
export default threadsSlice.reducer;
