/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLeaderboards as fetchLeaderboardsAPI } from "../../api/api";

export const fetchLeaderboards = createAsyncThunk(
  "leaderboards/fetchLeaderboards",
  // eslint-disable-next-line comma-dangle
  async () => fetchLeaderboardsAPI()
);

const leaderboardsSlice = createSlice({
  name: "leaderboards",
  initialState: {
    leaderboards: [],
    loading: false,
    loadingProgress: 0,
    error: null,
  },
  reducers: {
    setLoadingProgress: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loadingProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.loading = true;
        // eslint-disable-next-line no-param-reassign
        state.loadingProgress = 0;
        // eslint-disable-next-line no-param-reassign
        state.error = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.leaderboards = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.loadingProgress = 100;
      })
      .addCase(fetchLeaderboards.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.error = "Failed to fetch leaderboards.";
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.loadingProgress = 100;
      });
  },
});

export const { setLoadingProgress } = leaderboardsSlice.actions;
export default leaderboardsSlice.reducer;
