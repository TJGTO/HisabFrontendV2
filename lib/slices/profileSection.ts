import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProfileObj,
  ProfileSectionState,
  ISearchUserReqBody,
} from "../../app/profile/domain";
import {
  updateUser,
  getStates,
  getUserDetails,
  searchForPlayers,
  getProfilePermission,
  updateProfilePicture,
} from "../../app/profile/service";

const initialState: ProfileSectionState = {
  open: false,
  fetchDetailsLoader: false,
  updateLoader: false,
  updateMessage: "",
  errorOnUpdate: false,
  states: null,
  searchLoader: false,
  searchUsers: [],
  userProfile: {
    firstName: "",
    lastName: "",
    DOB: "",
    phone_no: "",
    email: "",
    academic: "",
    facebook: "",
    instagram: "",
    profilePictureURL: "",
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
  permissionMatrix: {
    editProfile: false,
  },
};

export const fetchUserDetails = createAsyncThunk(
  "profileSection/fetchUserDetails",
  async (userid?: string) => {
    try {
      let data = "";
      if (userid) {
        data = userid;
      }
      const response = await getUserDetails(data);
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
      dispatch(fetchUserDetails(""));
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const searchUsersProfiles = createAsyncThunk(
  "profileSection/searchUsers",
  async (data: ISearchUserReqBody) => {
    try {
      const response = await searchForPlayers(data);
      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const updateProfilePic = createAsyncThunk(
  "profileSection/updateProfilePic",
  async (data: FormData, { getState, dispatch }) => {
    try {
      const response = await updateProfilePicture(data);
      dispatch(fetchUserDetails(""));
      return response;
    } catch (err) {
      throw err;
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
      throw err;
    }
  }
);
export const fetchPermissionData = createAsyncThunk(
  "profileSection/fetchPermissionData",
  async (userid: string) => {
    try {
      const response = await getProfilePermission(userid);
      return response;
    } catch (err) {
      throw err;
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
    resetSearchResult: (state) => {
      state.searchUsers = [];
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
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.fetchDetailsLoader = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.fetchDetailsLoader = false;
      if (action.payload && action.payload.user) {
        state.userProfile = action.payload.user as updateProfileObj;
      }
    });
    builder.addCase(updateProfilePic.pending, (state) => {
      state.updateLoader = true;
    });
    builder.addCase(updateProfilePic.fulfilled, (state, action) => {
      if (action.payload) {
        if (action.payload.success) {
          state.updateLoader = false;
          state.updateMessage = action.payload?.message;
        } else {
          state.errorOnUpdate = true;
          state.updateLoader = false;
        }
        state.updateMessage = action.payload?.message;
      }
    });
    builder.addCase(updateProfilePic.rejected, (state, action) => {
      state.errorOnUpdate = true;
      state.updateLoader = false;
      state.updateMessage =
        action.error?.message || "Failed to Update profile picture";
    });
    builder.addCase(searchUsersProfiles.pending, (state) => {
      state.searchLoader = true;
    });
    builder.addCase(searchUsersProfiles.fulfilled, (state, action) => {
      state.searchLoader = false;
      if (action.payload) {
        if (action.payload.success) {
          state.searchUsers = action.payload.usersList;
        }
      }
    });
    builder.addCase(searchUsersProfiles.rejected, (state, action) => {
      state.searchLoader = false;
    });
    builder.addCase(fetchPermissionData.fulfilled, (state, action) => {
      if (action.payload) {
        if (action.payload.success) {
          state.permissionMatrix = action.payload.permissiondata;
        }
      }
    });
  },
});

export const { resetFlags, resetSearchResult } = profileSectionSlice.actions;

export default profileSectionSlice.reducer;
//searchUsers
