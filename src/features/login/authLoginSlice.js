/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */
/* eslint-disable no-return-await */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "../../api/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => await loginUserAPI({ email, password })
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    errorMessage: "",
    successMessage: "",
    token: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.successMessage = "Login successful!";
        state.errorMessage = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.successMessage = "";
      });
  },
});

export const { setEmail, setPassword, setErrorMessage, setSuccessMessage } =
  authSlice.actions;
export default authSlice.reducer;
