/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-return-await */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserAPI } from "../../api/api";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ name, email, password }) =>
    await registerUserAPI({ name, email, password })
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    name: "",
    email: "",
    password: "",
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
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
      .addCase(registerUser.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        state.errorMessage = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.successMessage = "";
      });
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setErrorMessage,
  setSuccessMessage,
} = registerSlice.actions;
export default registerSlice.reducer;
