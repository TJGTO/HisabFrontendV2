import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../../app/registration/service";
import { loginUser } from "../../app/login/service";
import { registrationObj } from "../../app/registration/domain";
import { loginObj } from "../../app/login/domain";

const initialState = {
  count: 1,
  registrationLoader: false,
  registrationSuccess: false,
  registrationMessage: "",
  loginLoader: false,
  userDetail: null,
  loginMessage: "",
};

export const registerTheUser = createAsyncThunk(
  "authorization/registration",
  async (data: registrationObj) => {
    try {
      const response = await registerUser(data);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginOfUser = createAsyncThunk(
  "authorization/login",
  async (data: loginObj) => {
    try {
      const response = await loginUser(data);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerTheUser.pending, (state) => {
      state.registrationLoader = true;
    });
    builder.addCase(registerTheUser.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.registrationSuccess = true;
        state.registrationMessage = action.payload.message;
      } else if (action.payload) {
        state.registrationSuccess = false;
        state.registrationMessage = action.payload.message;
      }

      state.registrationLoader = false;
    });
    builder.addCase(loginOfUser.pending, (state) => {
      state.loginLoader = true;
    });
    builder.addCase(loginOfUser.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.userDetail = action.payload.userdata;
        state.loginMessage = action.payload.message;
      } else if (action.payload) {
        state.userDetail = null;
        state.loginMessage = action.payload.message;
      }
      state.loginLoader = false;
    });
  },
});

export const { increment } = authorizationSlice.actions;

export default authorizationSlice.reducer;
