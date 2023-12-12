import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProfileObj,
  ProfileSectionState,
} from "../../app/profile/domain";
import { updateUser } from "../../app/profile/service";

const initialState: ProfileSectionState = {
  open: false,
  updateLoader: false,
  updateMessage: "",
  userProfile: {
    firstName: "",
    lastName: "",
    DOB: "",
    phone_no: "",
    email: "",
    facebook: "",
    instagram: "",
    youtube: "",
    about: "",
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
const profileSectionSlice = createSlice({
  name: "profileSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTheUser.pending, (state) => {
      state.updateLoader = true;
    });
    builder.addCase(updateTheUser.fulfilled, (state, action) => {
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
      }
      state.updateLoader = false;
    });
  },
});

export default profileSectionSlice.reducer;
