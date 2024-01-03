import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProfileObj,
  ProfileSectionState,
} from "../../app/profile/domain";
import {
  updateUser,
  getStates,
  getUserDetails,
} from "../../app/profile/service";

const initialState: ProfileSectionState = {
  open: false,
  updateLoader: false,
  updateMessage: "",
  errorOnUpdate: false,
  states: null,
  userProfile: {
    firstName: "",
    lastName: "",
    DOB: "",
    phone_no: "",
    email: "",
    academic: "",
    facebook: "",
    instagram: "",
    youtube: "",
    about: "",
    address: {
      address_line_1: "",
      address_line_2: "",
      pincode: "",
      city: "",
      state: {
        state_id: "",
        state_name: "",
      },
    },
  },
};

export const fetchUserDetails = createAsyncThunk(
  "profileSection/fetchUserDetails",
  async () => {
    try {
      const response = await getUserDetails();
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateTheUser = createAsyncThunk(
  "profileSection/updateUser",
  async (data: updateProfileObj, { getState, dispatch }) => {
    try {
      const response = await updateUser(data);
      dispatch(fetchUserDetails());
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchAllStates = createAsyncThunk(
  "profileSection/fetchAllStates",
  async () => {
    try {
      const response = await getStates();
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
const profileSectionSlice = createSlice({
  name: "profileSection",
  initialState,
  reducers: {
    resetFlags: (state) => {
      state.errorOnUpdate = false;
      state.updateMessage = "";
      state.updateLoader = false;
      state.states = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateTheUser.pending, (state) => {
      state.updateLoader = true;
    });
    builder.addCase(updateTheUser.fulfilled, (state, action) => {
      state.updateLoader = false;
      state.errorOnUpdate = false;
      state.updateMessage = "";
      if (action.payload && action.payload.success) {
        state.updateMessage = action.payload.message;
      } else if (action.payload) {
        state.updateMessage = action.payload.message;
        state.errorOnUpdate = true;
      }
      state.updateLoader = false;
    });
    builder.addCase(fetchAllStates.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.states = action.payload.states;
      }
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      if (action.payload && action.payload.user) {
        state.userProfile = action.payload.user as updateProfileObj;
      }
    });
  },
});

export const { resetFlags } = profileSectionSlice.actions;

export default profileSectionSlice.reducer;
