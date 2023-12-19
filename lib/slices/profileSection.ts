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

export const updateTheUser = createAsyncThunk(
  "profileSection/updateUser",
  async (data: updateProfileObj) => {
    try {
      const response = await updateUser(data);
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
const profileSectionSlice = createSlice({
  name: "profileSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTheUser.pending, (state) => {
      state.updateLoader = true;
    });
    builder.addCase(updateTheUser.fulfilled, (state, action) => {
      state.updateLoader = false;
      if (action.payload && action.payload.success) {
        state.updateMessage = action.payload.message;
        if (action.payload.userdata) {
          let Obj = JSON.parse(JSON.stringify(state));
          let keyNames = Object.keys(action.payload.userdata);
          keyNames.forEach((x) => {
            Obj.userProfile[x] = action.payload?.userdata[x];
          });
          state = JSON.parse(JSON.stringify(Obj));
        }
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

export default profileSectionSlice.reducer;
