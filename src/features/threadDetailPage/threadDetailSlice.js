/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchThreadDetail = createAsyncThunk(
  "threadDetail/fetchThreadDetail",
  async (threadId) => {
    const response = await fetch(
      `https://forum-api.dicoding.dev/v1/threads/${threadId}`
    );
    const data = await response.json();
    return data.data.detailThread;
  }
);

export const submitComment = createAsyncThunk(
  "threadDetail/submitComment",
  async ({ threadId, comment, token }) => {
    const response = await fetch(
      `https://forum-api.dicoding.dev/v1/threads/${threadId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const updatedThreadDetail = fetchThreadDetail(threadId);
      return updatedThreadDetail;
    }
    throw new Error(data.message || "Failed to submit comment");
  }
);

const threadDetailSlice = createSlice({
  name: "threadDetail",
  initialState: {
    thread: null,
    newComment: "",
    isAuthenticated: false,
    loadingProgress: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setNewComment: (state, action) => {
      state.newComment = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoadingProgress: (state, action) => {
      state.loadingProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
        state.loadingProgress = 0;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.loading = false;
        state.loadingProgress = 100;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.loadingProgress = 100;
      });

    builder
      .addCase(submitComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitComment.fulfilled, (state, action) => {
        state.thread = action.payload;
        state.newComment = "";
        state.loading = false;
      })
      .addCase(submitComment.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setNewComment, setIsAuthenticated, setLoadingProgress } =
  threadDetailSlice.actions;

export default threadDetailSlice.reducer;
